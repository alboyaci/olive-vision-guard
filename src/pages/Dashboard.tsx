import { Navigation } from "@/components/ui/navigation";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { JobStatusBadge } from "@/components/jobs/JobStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Upload, 
  BarChart3, 
  Leaf, 
  AlertTriangle,
  Eye,
  Download,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-olive-grove.jpg";

// Mock data for demonstration
const recentJobs = [
  {
    id: "job-001",
    name: "Grove Analysis #1",
    status: "completed" as const,
    progress: 100,
    imagesProcessed: 45,
    totalImages: 45,
    healthyLeaves: 38,
    diseasedLeaves: 7,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "job-002", 
    name: "Batch Process #2",
    status: "running" as const,
    progress: 67,
    imagesProcessed: 23,
    totalImages: 34,
    healthyLeaves: 18,
    diseasedLeaves: 5,
    createdAt: "2024-01-15T11:15:00Z"
  },
  {
    id: "job-003",
    name: "Weekly Check",
    status: "queued" as const,
    progress: 0,
    imagesProcessed: 0,
    totalImages: 78,
    healthyLeaves: 0,
    diseasedLeaves: 0,
    createdAt: "2024-01-15T12:00:00Z"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">Olive Tree</span>
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Disease Detection
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Advanced AI-powered analysis for early detection of olive tree diseases. 
              Monitor your groves with precision using computer vision and machine learning.
            </p>
            <div className="mt-8 flex space-x-4">
              <Button className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-success">
                <Upload className="mr-2 h-4 w-4" />
                Start Analysis
              </Button>
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Total Images Processed"
            value="2,847"
            description="This week"
            icon={BarChart3}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Healthy Leaves Detected"
            value="2,204"
            description="77.4% of total"
            icon={Leaf}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Disease Cases Found"
            value="643"
            description="22.6% of total"
            icon={AlertTriangle}
            trend={{ value: -3, isPositive: false }}
          />
          <StatsCard
            title="Active Jobs"
            value="3"
            description="2 running, 1 queued"
            icon={Clock}
          />
        </div>

        {/* Current Jobs */}
        <Card className="mb-8 shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Analysis Jobs</CardTitle>
                <CardDescription>
                  Monitor your image processing tasks and results
                </CardDescription>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border bg-gradient-card p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{job.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{job.imagesProcessed} / {job.totalImages} images</span>
                        <span>•</span>
                        <span>{new Date(job.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <JobStatusBadge status={job.status} />
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {job.status === "running" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-2" />
                    </div>
                  )}
                  
                  {job.status === "completed" && (
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-success"></div>
                          <span>{job.healthyLeaves} Healthy</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-warning"></div>
                          <span>{job.diseasedLeaves} Diseased</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Results
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-elegant hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Quick Upload</span>
              </CardTitle>
              <CardDescription>
                Start analyzing your olive tree images immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary">
                Upload Images
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Analysis Reports</span>
              </CardTitle>
              <CardDescription>
                View detailed insights and historical data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}