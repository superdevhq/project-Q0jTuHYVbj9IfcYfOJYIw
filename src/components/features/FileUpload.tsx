
import React, { useState, useRef, useCallback } from "react";
import { Upload, X, AlertCircle, CheckCircle2, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export type FileStatus = "idle" | "uploading" | "error" | "success";

export interface FileWithStatus {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
  error?: string;
}

export interface FileUploadProps {
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Allowed file types */
  accept?: string;
  /** Whether to allow multiple files */
  multiple?: boolean;
  /** Custom class for the upload area */
  className?: string;
  /** Callback when files are added */
  onFilesAdded?: (files: File[]) => void;
  /** Callback when a file is removed */
  onFileRemove?: (fileId: string) => void;
}

export function FileUpload({
  maxFiles = 5,
  maxSize = 1024 * 1024 * 10, // 10MB
  accept,
  multiple = true,
  className,
  onFilesAdded,
  onFileRemove,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate a unique ID for each file
  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleFiles = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      const newFiles: File[] = [];
      const fileArray = Array.from(selectedFiles);

      // Check if adding these files would exceed the max files limit
      if (files.length + fileArray.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} files.`);
        return;
      }

      fileArray.forEach((file) => {
        // Check file size
        if (file.size > maxSize) {
          alert(`File ${file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
          return;
        }

        newFiles.push(file);
      });

      if (newFiles.length === 0) return;

      // Add files with status
      const filesWithStatus: FileWithStatus[] = newFiles.map((file) => ({
        file,
        id: generateId(),
        progress: 0,
        status: "idle",
      }));

      setFiles((prev) => [...prev, ...filesWithStatus]);

      // Call the callback if provided
      if (onFilesAdded) {
        onFilesAdded(newFiles);
      }

      // Simulate upload progress for demo purposes
      // In a real implementation, this would be replaced with actual upload logic
      filesWithStatus.forEach((fileWithStatus) => {
        simulateUploadProgress(fileWithStatus.id);
      });
    },
    [files.length, maxFiles, maxSize, onFilesAdded]
  );

  // Simulate file upload progress (for demo purposes)
  const simulateUploadProgress = (fileId: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "uploading" } : f))
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: "success" } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: Math.round(progress) } : f
          )
        );
      }
    }, 300);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleRemoveFile = useCallback(
    (id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
      if (onFileRemove) {
        onFileRemove(id);
      }
    },
    [onFileRemove]
  );

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
        <File className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  };

  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case "uploading":
        return null;
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drag & Drop Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={files.length < maxFiles ? openFileDialog : undefined}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={files.length >= maxFiles}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </h3>
          <p className="text-sm text-muted-foreground">
            or click to browse your files
          </p>
          <div className="mt-2 text-xs text-muted-foreground">
            <p>Maximum {maxFiles} files</p>
            <p>Maximum size: {maxSize / (1024 * 1024)}MB per file</p>
            {accept && <p>Accepted formats: {accept.replace(/,/g, ", ")}</p>}
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Files ({files.length}/{maxFiles})</h4>
          <ul className="space-y-2">
            {files.map((fileWithStatus) => (
              <li
                key={fileWithStatus.id}
                className="flex items-center gap-3 p-3 rounded-md border bg-background"
              >
                {getFileIcon(fileWithStatus.file)}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="truncate text-sm font-medium">
                      {fileWithStatus.file.name}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(fileWithStatus.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(fileWithStatus.file.size / 1024).toFixed(1)} KB
                  </div>
                  {fileWithStatus.status === "uploading" && (
                    <div className="mt-2">
                      <Progress value={fileWithStatus.progress} className="h-1" />
                      <span className="text-xs text-muted-foreground mt-1">
                        {fileWithStatus.progress}%
                      </span>
                    </div>
                  )}
                  {fileWithStatus.error && (
                    <div className="text-xs text-destructive mt-1">
                      {fileWithStatus.error}
                    </div>
                  )}
                </div>
                {getStatusIcon(fileWithStatus.status)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
