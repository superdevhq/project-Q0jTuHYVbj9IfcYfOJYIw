
import React from "react";
import { FileUpload } from "@/components/features/FileUpload";

const FileUploadDemo = () => {
  const handleFilesAdded = (files: File[]) => {
    console.log("Files added:", files);
    // In a real implementation, you would upload these files to Supabase storage
  };

  const handleFileRemove = (fileId: string) => {
    console.log("File removed:", fileId);
    // In a real implementation, you would cancel the upload or remove from Supabase
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">File Upload</h1>
      <div className="mb-8">
        <p className="text-muted-foreground mb-4">
          Drag and drop files or click to browse. You can upload up to 5 files, with a maximum size of 10MB each.
        </p>
        <FileUpload 
          maxFiles={5}
          maxSize={10 * 1024 * 1024} // 10MB
          accept="image/*,.pdf,.docx"
          onFilesAdded={handleFilesAdded}
          onFileRemove={handleFileRemove}
        />
      </div>
      
      <div className="mt-10 p-4 border rounded-md bg-muted/20">
        <h2 className="text-xl font-semibold mb-2">Implementation Notes</h2>
        <p className="text-sm text-muted-foreground">
          This is a UI-only implementation. To integrate with Supabase Storage:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
          <li>Replace the simulated upload with actual Supabase storage uploads</li>
          <li>Track real upload progress using XHR or fetch with progress tracking</li>
          <li>Add file type validation based on your application needs</li>
          <li>Implement proper error handling for upload failures</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadDemo;
