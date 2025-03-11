
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
    // Log a message to the console
    console.log("Hello from the server function!")
    
    // Create a response object
    const data = {
      message: "Hello from the server!",
      timestamp: new Date().toISOString(),
      success: true,
      data: {
        randomNumber: Math.floor(Math.random() * 100),
        environment: Deno.env.get("ENVIRONMENT") || "development"
      }
    }

    // Return the JSON response
    return new Response(
      JSON.stringify(data),
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
    console.error("Error in server function:", error.message)
    
    // Return an error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
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
