
import React from "react";
import { EmailTest } from "@/components/features/EmailTest";

const EmailDemo = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Email Sending Demo</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        This page demonstrates sending emails using Resend via Supabase Edge Functions.
      </p>
      
      <div className="max-w-md mx-auto">
        <EmailTest />
      </div>
      
      <div className="mt-10 p-4 border rounded-md bg-muted/20 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <p className="text-sm text-muted-foreground mb-4">
          When you submit the form, the following happens:
        </p>
        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
          <li>The client sends the email data to the Supabase Edge Function named "send-email"</li>
          <li>The edge function uses Resend API to send the email</li>
          <li>The email is sent from no-reply@updates.trytadam.com</li>
          <li>The function returns a response with the status of the email sending operation</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailDemo;
