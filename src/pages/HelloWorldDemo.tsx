
import React from "react";
import { HelloWorldTest } from "@/components/features/HelloWorldTest";

const HelloWorldDemo = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Supabase Edge Function Demo</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        This page demonstrates calling a simple Supabase Edge Function that logs a message and returns a JSON response.
      </p>
      
      <div className="max-w-md mx-auto">
        <HelloWorldTest />
      </div>
      
      <div className="mt-10 p-4 border rounded-md bg-muted/20 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <p className="text-sm text-muted-foreground mb-4">
          When you click the button, the following happens:
        </p>
        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
          <li>The client calls the Supabase Edge Function named "hello-world"</li>
          <li>The function logs a message to the server console</li>
          <li>It creates a JSON response with a message, timestamp, and some random data</li>
          <li>The response is returned to the client and displayed below the button</li>
        </ol>
      </div>
    </div>
  );
};

export default HelloWorldDemo;
