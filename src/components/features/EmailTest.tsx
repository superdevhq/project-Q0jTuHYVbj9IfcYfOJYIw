
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function EmailTest() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("Test Email from Supabase");
  const [message, setMessage] = useState("This is a test email sent from a Supabase Edge Function using Resend.");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendTestEmail = async () => {
    if (!recipient || !recipient.includes('@')) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        method: 'POST',
        body: {
          to: recipient,
          subject,
          message
        }
      });
      
      if (error) {
        throw error;
      }
      
      setResponse(data);
      console.log("Response from email function:", data);
    } catch (err) {
      console.error("Error sending email:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send Test Email</CardTitle>
        <CardDescription>
          Send a test email using Resend via Supabase Edge Functions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Email</Label>
          <Input 
            id="recipient" 
            type="email" 
            placeholder="recipient@example.com" 
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input 
            id="subject" 
            placeholder="Email subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea 
            id="message" 
            placeholder="Your message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>
        
        <Button 
          onClick={sendTestEmail} 
          disabled={loading}
          className="w-full mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending email...
            </>
          ) : (
            "Send Test Email"
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
        This component demonstrates sending emails with Resend via Supabase Edge Functions
      </CardFooter>
    </Card>
  );
}
