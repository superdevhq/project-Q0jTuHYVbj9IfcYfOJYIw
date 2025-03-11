
import React, { useState, useCallback, useEffect } from "react";
import { FileUpload, FileWithStatus } from "@/components/features/FileUpload";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ExternalLink, Trash2, AlertCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SupabaseFileUploadProps {
  bucketName: string;
  folderPath?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  onUploadComplete?: (files: Array<{ path: string; url: string }>) => void;
}

export function SupabaseFileUpload({
  bucketName,
  folderPath = "",
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = "image/*,.pdf,.docx",
  onUploadComplete,
}: SupabaseFileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ path: string; url: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize component and check for existing files
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setIsInitializing(true);
        setError(null);
        
        // Try to list files in the bucket to check if it exists and is accessible
        if (folderPath) {
          const { data, error } = await supabase.storage
            .from(bucketName)
            .list(folderPath);
          
          if (error) {
            console.error(`Error listing files in ${folderPath}:`, error);
          } else if (data) {
            // If there are files in the folder path, load them
            const filesInFolder = data.filter(item => !item.id.endsWith('/')); // Filter out folders
            
            if (filesInFolder.length > 0) {
              const existingFiles = filesInFolder.map(file => {
                const filePath = folderPath ? `${folderPath}/${file.name}` : file.name;
                const { data: { publicUrl } } = supabase.storage
                  .from(bucketName)
                  .getPublicUrl(filePath);
                
                return { path: filePath, url: publicUrl };
              });
              
              setUploadedFiles(existingFiles);
            }
          }
        }
      } catch (err) {
        console.error("Error initializing component:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred during initialization");
      } finally {
        setIsInitializing(false);
      }
    };
    
    initializeComponent();
  }, [bucketName, folderPath]);

  // Handle file upload to Supabase Storage
  const handleFilesAdded = async (files: File[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create folder if it doesn't exist and folderPath is specified
      if (folderPath) {
        try {
          // This is a workaround to "create" a folder in Supabase Storage
          // by uploading an empty file with a folder path
          const { error: folderError } = await supabase.storage
            .from(bucketName)
            .upload(`${folderPath}/.folder`, new Blob([]), {
              upsert: true
            });
            
          if (folderError && !folderError.message.includes('already exists')) {
            console.warn(`Warning creating folder: ${folderError.message}`);
          }
        } catch (folderErr) {
          console.warn("Folder creation warning:", folderErr);
          // Continue even if folder creation fails
        }
      }
      
      const uploadPromises = files.map(async (file) => {
        // Create a unique file path to avoid name collisions
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
        
        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (error) {
          throw new Error(`Error uploading file ${file.name}: ${error.message}`);
        }
        
        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);
          
        return { path: data.path, url: publicUrl };
      });
      
      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);
      
      // Update state with uploaded files
      setUploadedFiles(prev => [...prev, ...results]);
      
      // Call the callback if provided
      if (onUploadComplete) {
        onUploadComplete(results);
      }
    } catch (err) {
      console.error("Error uploading files:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during upload");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file removal from Supabase Storage
  const handleFileRemove = useCallback(async (filePath: string) => {
    try {
      setIsLoading(true);
      
      // Remove file from Supabase Storage
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);
        
      if (error) {
        throw new Error(`Error removing file: ${error.message}`);
      }
      
      // Update state to remove the file
      setUploadedFiles(prev => prev.filter(file => file.path !== filePath));
    } catch (err) {
      console.error("Error removing file:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred while removing the file");
    } finally {
      setIsLoading(false);
    }
  }, [bucketName]);

  // Render loading state while initializing
  if (isInitializing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="font-medium">Initializing storage...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Connecting to Supabase Storage
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FileUpload
        maxFiles={maxFiles}
        maxSize={maxSize}
        accept={accept}
        onFilesAdded={handleFilesAdded}
      />
      
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Processing files...</span>
        </div>
      )}
      
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>
              Files stored in Supabase Storage bucket: {bucketName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {uploadedFiles.map((file) => (
                <li key={file.path} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="truncate text-sm font-medium">{file.path.split('/').pop()}</p>
                    <p className="text-xs text-muted-foreground truncate">{file.path}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleFileRemove(file.path)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Files will remain in storage until explicitly deleted
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
