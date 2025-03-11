
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function HelloWorldTest() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callHelloWorldFunction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('hello-world', {
        method: 'GET',
      });
      
      if (error) {
        throw error;
      }
      
      setResponse(data);
      console.log("Response from server function:", data);
    } catch (err) {
      console.error("Error calling function:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test Server Function</CardTitle>
        <CardDescription>
          Call the hello-world edge function to test Supabase Functions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={callHelloWorldFunction} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calling function...
            </>
          ) : (
            "Call Hello World Function"
          )}
        </Button>
        
        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}
        
        {response && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Response:</h3>
            <pre className="bg-muted p-3 rounded-md text-sm overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        This component demonstrates calling a Supabase Edge Function
      </CardFooter>
    </Card>
  );
}
