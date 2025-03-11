
// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.com/manual/getting_started/setup_your_environment

// This is using Deno Deploy, a distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    // Get the Resend API key from environment variables
    const resendApiKey = Deno.env.get("RESEND_API_KEY")
    
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not set in environment variables")
    }
    
    // Parse the request body if it exists
    let emailData = {
      to: "",
      subject: "Test Email from Supabase Edge Function",
      message: "This is a test email sent from a Supabase Edge Function using Resend."
    }
    
    if (req.method === "POST") {
      try {
        const body = await req.json()
        emailData = {
          ...emailData,
          ...body
        }
      } catch (e) {
        console.log("No valid JSON body provided, using default values")
      }
    }
    
    // Validate email recipient
    if (!emailData.to || !emailData.to.includes('@')) {
      throw new Error("Valid recipient email address is required")
    }
    
    console.log(`Sending email to ${emailData.to}`)
    
    // Send the email using Resend API directly
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: "no-reply@updates.trytadam.com",
        to: emailData.to,
        subject: emailData.subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; font-size: 24px;">${emailData.subject}</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">${emailData.message}</p>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px;">This is an automated message from your application.</p>
            </div>
          </div>
        `
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(`Failed to send email: ${result.message || response.statusText}`)
    }
    
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        data: {
          emailId: result.id,
          recipient: emailData.to,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 200 
      },
    )
  } catch (error) {
    // Log any errors
    console.error("Error in send-email function:", error.message)
    
    // Return an error response
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 500 
      },
    )
  }
})
