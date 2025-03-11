
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-4">Modern File Upload Component</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A beautiful drag & drop file upload component with progress tracking and multi-file support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/file-upload">View Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
