
import React, { useState } from "react";
import { SupabaseFileUpload } from "@/components/features/SupabaseFileUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const SupabaseFileUploadDemo = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ path: string; url: string }>>([]);

  const handleUploadComplete = (files: Array<{ path: string; url: string }>) => {
    console.log("Files uploaded to Supabase:", files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Supabase Storage File Upload</h1>
      
      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Integration with Supabase Storage</AlertTitle>
        <AlertDescription>
          This demo shows a real implementation of file uploads to Supabase Storage.
          Files are stored in the 'public' bucket and can be accessed via their public URLs.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="upload" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <div className="mb-6">
            <p className="text-muted-foreground mb-4">
              Drag and drop files or click to browse. Files will be uploaded to the Supabase 'public' bucket.
            </p>
            <SupabaseFileUpload 
              bucketName="public"
              folderPath="uploads"
              maxFiles={5}
              maxSize={10 * 1024 * 1024} // 10MB
              accept="image/*,.pdf,.docx"
              onUploadComplete={handleUploadComplete}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="about">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">How It Works</h2>
            <p className="text-muted-foreground">
              This component demonstrates a complete integration with Supabase Storage:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Files are uploaded to your Supabase project's storage</li>
              <li>Each file gets a unique UUID to prevent name collisions</li>
              <li>Public URLs are generated for easy access to uploaded files</li>
              <li>Files can be viewed or deleted directly from the interface</li>
              <li>Error handling for upload failures and size limitations</li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6">Implementation Details</h3>
            <p className="text-muted-foreground">
              The component uses the Supabase JavaScript client to interact with Storage:
            </p>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto mt-2">
{`// Upload file to Supabase Storage
const { data, error } = await supabase.storage
  .from(bucketName)
  .upload(filePath, file, {
    cacheControl: '3600',
    upsert: false
  });

// Get public URL for the uploaded file
const { data: { publicUrl } } = supabase.storage
  .from(bucketName)
  .getPublicUrl(filePath);`}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-10 p-4 border rounded-md bg-muted/20">
          <h2 className="text-xl font-semibold mb-2">Usage Example</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Here's how you might use the uploaded files in your application:
          </p>
          <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
{`// Example of using the uploaded files
const uploadedFiles = ${JSON.stringify(uploadedFiles, null, 2)};

// Display an image
<img src="${uploadedFiles[0]?.url || '[file-url]'}" alt="Uploaded file" />

// Create a download link
<a href="${uploadedFiles[0]?.url || '[file-url]'}" download>Download File</a>`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SupabaseFileUploadDemo;
