import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-6xl font-bold text-muted-foreground/20 mb-4">
            404
          </div>
          
          <div className="space-y-2">
            <Button asChild className="w-full bg-gradient-primary text-primary-foreground">
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Dashboard
              </a>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <a href="/upload">
                <Search className="mr-2 h-4 w-4" />
                Start Analysis
              </a>
            </Button>
          </div>
          
          <div className="text-center text-xs text-muted-foreground pt-4">
            <p>If you believe this is an error, please contact support.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
