
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-4">Supabase Integration Demos</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore modern UI components with Supabase backend integration
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link to="/file-upload">File Upload Demo</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/hello-world">Edge Function Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
