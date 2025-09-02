import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { FileUploadZone } from "@/components/upload/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Upload, 
  Settings2, 
  Brain, 
  Zap,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [jobName, setJobName] = useState("");
  const [minArea, setMinArea] = useState([500]);
  const [maxArea, setMaxArea] = useState([150000]);
  const [aeThreshold, setAeThreshold] = useState([0.165]);
  const [selectedAEModel, setSelectedAEModel] = useState("default");
  const [selectedClassifier, setSelectedClassifier] = useState("resnet18-v1");
  const { toast } = useToast();

  const handleStartAnalysis = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one image or ZIP file to analyze.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Analysis started",
      description: `Processing ${selectedFiles.length} files with job "${jobName || 'Untitled Analysis'}"`,
    });

    // Here you would typically send the files and parameters to your API
    console.log("Starting analysis with:", {
      files: selectedFiles,
      jobName,
      parameters: {
        minArea: minArea[0],
        maxArea: maxArea[0],
        aeThreshold: aeThreshold[0],
        aeModel: selectedAEModel,
        classifier: selectedClassifier
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Image Analysis</h1>
          <p className="mt-2 text-muted-foreground">
            Upload images for olive tree disease detection and configure analysis parameters
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload Images</span>
                </CardTitle>
                <CardDescription>
                  Upload individual images (JPG, PNG) or a ZIP file containing multiple images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadZone
                  onFilesSelected={setSelectedFiles}
                  className="mb-4"
                />
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="job-name">Job Name (Optional)</Label>
                    <Input
                      id="job-name"
                      placeholder="e.g., Grove Section A Analysis"
                      value={jobName}
                      onChange={(e) => setJobName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Parameters */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings2 className="h-5 w-5" />
                  <span>Analysis Parameters</span>
                </CardTitle>
                <CardDescription>
                  Configure the detection and classification settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="segmentation" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
                    <TabsTrigger value="filtering">Filtering</TabsTrigger>
                    <TabsTrigger value="classification">Classification</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="segmentation" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Minimum Area (pixels)</Label>
                        <div className="mt-2 space-y-2">
                          <Slider
                            value={minArea}
                            onValueChange={setMinArea}
                            max={5000}
                            min={100}
                            step={50}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>100</span>
                            <span className="font-medium">{minArea[0]} pixels</span>
                            <span>5,000</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Maximum Area (pixels)</Label>
                        <div className="mt-2 space-y-2">
                          <Slider
                            value={maxArea}
                            onValueChange={setMaxArea}
                            max={300000}
                            min={10000}
                            step={5000}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>10K</span>
                            <span className="font-medium">{maxArea[0].toLocaleString()} pixels</span>
                            <span>300K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="filtering" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Autoencoder Threshold</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Lower values are more selective (fewer false positives)
                        </p>
                        <div className="mt-2 space-y-2">
                          <Slider
                            value={aeThreshold}
                            onValueChange={setAeThreshold}
                            max={1.0}
                            min={0.01}
                            step={0.001}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>0.01</span>
                            <span className="font-medium">{aeThreshold[0].toFixed(3)}</span>
                            <span>1.0</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Autoencoder Model</Label>
                        <Select value={selectedAEModel} onValueChange={setSelectedAEModel}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Autoencoder v1.2</SelectItem>
                            <SelectItem value="v1.1">Autoencoder v1.1</SelectItem>
                            <SelectItem value="experimental">Experimental v2.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="classification" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Classification Model</Label>
                        <Select value={selectedClassifier} onValueChange={setSelectedClassifier}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="resnet18-v1">ResNet18 v1.0 (Recommended)</SelectItem>
                            <SelectItem value="resnet34-v1">ResNet34 v1.0</SelectItem>
                            <SelectItem value="efficientnet-b0">EfficientNet B0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Files Selected</span>
                  <Badge variant="outline">{selectedFiles.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estimated Time</span>
                  <Badge variant="outline">
                    {selectedFiles.length === 0 ? "—" : `~${Math.ceil(selectedFiles.length * 2.5)} min`}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Brain className="h-4 w-4 text-primary" />
                    <span>AI Model: {selectedClassifier}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Zap className="h-4 w-4 text-warning" />
                    <span>Threshold: {aeThreshold[0].toFixed(3)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Card className="shadow-elegant bg-gradient-card">
              <CardContent className="p-6">
                <Button 
                  className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-success"
                  size="lg"
                  onClick={handleStartAnalysis}
                  disabled={selectedFiles.length === 0}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Start Analysis
                </Button>
                {selectedFiles.length === 0 && (
                  <div className="flex items-center space-x-2 mt-3 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Upload files to begin</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p><strong>Supported formats:</strong> JPG, PNG, ZIP</p>
                  <p><strong>Max file size:</strong> 10MB per file</p>
                  <p><strong>Best results:</strong> High-resolution leaf images with good lighting</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}