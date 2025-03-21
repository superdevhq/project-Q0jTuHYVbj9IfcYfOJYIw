
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FileUploadDemo from "./pages/FileUploadDemo";
import HelloWorldDemo from "./pages/HelloWorldDemo";
import EmailDemo from "./pages/EmailDemo";
import SupabaseFileUploadDemo from "./pages/SupabaseFileUploadDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/file-upload" element={<FileUploadDemo />} />
            <Route path="/hello-world" element={<HelloWorldDemo />} />
            <Route path="/email" element={<EmailDemo />} />
            <Route path="/supabase-upload" element={<SupabaseFileUploadDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
