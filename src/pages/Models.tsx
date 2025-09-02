import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Upload, 
  Database, 
  CheckCircle, 
  Clock, 
  Download,
  Trash2,
  FileText,
  Brain,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModelVersion {
  id: string;
  name: string;
  version: string;
  type: "autoencoder" | "classifier";
  status: "active" | "inactive" | "training";
  accuracy?: number;
  size: string;
  uploadedAt: string;
  sha256: string;
}

const mockModels: ModelVersion[] = [
  {
    id: "ae-v1.2",
    name: "Default Autoencoder",
    version: "1.2",
    type: "autoencoder",
    status: "active",
    size: "45.2 MB",
    uploadedAt: "2024-01-10T09:30:00Z",
    sha256: "a7f8d9e2c1b4..."
  },
  {
    id: "clf-resnet18-v1",
    name: "ResNet18 Classifier",
    version: "1.0",
    type: "classifier", 
    status: "active",
    accuracy: 94.2,
    size: "42.8 MB",
    uploadedAt: "2024-01-08T14:20:00Z",
    sha256: "b8e9f0a3d2c5..."
  },
  {
    id: "ae-v1.1",
    name: "Previous Autoencoder",
    version: "1.1",
    type: "autoencoder",
    status: "inactive",
    size: "44.1 MB",
    uploadedAt: "2024-01-05T11:45:00Z",
    sha256: "c9f0a1b4e3d6..."
  },
  {
    id: "clf-resnet34-v1",
    name: "ResNet34 Classifier",
    version: "1.0",
    type: "classifier",
    status: "inactive",
    accuracy: 95.8,
    size: "78.3 MB",
    uploadedAt: "2024-01-03T16:10:00Z",
    sha256: "d0a1b2c5f4e7..."
  }
];

export default function ModelsPage() {
  const [models, setModels] = useState<ModelVersion[]>(mockModels);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState<"autoencoder" | "classifier">("autoencoder");
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !modelName.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a file and enter a model name.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const validExtensions = ['.pt', '.pth'];
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please select a .pt or .pth file.",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload with progress
    const newModel: ModelVersion = {
      id: `${modelType}-${Date.now()}`,
      name: modelName.trim(),
      version: "1.0",
      type: modelType,
      status: "inactive",
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString(),
      sha256: `${Date.now().toString(36)}...`
    };

    setModels([newModel, ...models]);
    setUploadDialogOpen(false);
    setSelectedFile(null);
    setModelName("");

    toast({
      title: "Model uploaded",
      description: `${modelName.trim()} has been uploaded successfully.`,
    });
  };

  const handleActivate = (modelId: string) => {
    setModels(models.map(model => {
      if (model.id === modelId) {
        return { ...model, status: "active" as const };
      }
      if (model.type === models.find(m => m.id === modelId)?.type && model.status === "active") {
        return { ...model, status: "inactive" as const };
      }
      return model;
    }));

    const modelName = models.find(m => m.id === modelId)?.name;
    toast({
      title: "Model activated",
      description: `${modelName} is now active and will be used for new analyses.`,
    });
  };

  const handleDelete = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model?.status === "active") {
      toast({
        title: "Cannot delete active model",
        description: "Please activate another model first.",
        variant: "destructive",
      });
      return;
    }

    setModels(models.filter(m => m.id !== modelId));
    toast({
      title: "Model deleted",
      description: `${model?.name} has been removed.`,
    });
  };

  const getStatusBadge = (status: ModelVersion["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "training":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Training</Badge>;
    }
  };

  const autoencoders = models.filter(m => m.type === "autoencoder");
  const classifiers = models.filter(m => m.type === "classifier");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Model Management</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your autoencoder and classifier models for olive tree disease detection
            </p>
          </div>
          
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground shadow-glow">
                <Upload className="mr-2 h-4 w-4" />
                Upload Model
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Model</DialogTitle>
                <DialogDescription>
                  Upload a new autoencoder or classifier model file (.pt or .pth)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="model-name">Model Name</Label>
                  <Input
                    id="model-name"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="e.g., ResNet50 v2.0"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="model-type">Model Type</Label>
                  <select
                    id="model-type"
                    value={modelType}
                    onChange={(e) => setModelType(e.target.value as "autoencoder" | "classifier")}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="autoencoder">Autoencoder</option>
                    <option value="classifier">Classifier</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="model-file">Model File</Label>
                  <Input
                    id="model-file"
                    type="file"
                    accept=".pt,.pth"
                    onChange={handleFileSelect}
                    className="mt-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload}>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Autoencoder Models */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>Autoencoder Models</span>
              </CardTitle>
              <CardDescription>
                Models for filtering leaf vs non-leaf segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autoencoders.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-gradient-card"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{model.name}</h4>
                        {getStatusBadge(model.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        v{model.version} • {model.size} • {new Date(model.uploadedAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        SHA: {model.sha256}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {model.status !== "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleActivate(model.id)}
                        >
                          Activate
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          // Simulate download
                          const link = document.createElement('a');
                          link.href = '#';
                          link.download = `${model.name.replace(/\s+/g, '_')}_v${model.version}.pt`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          toast({
                            title: "Download started",
                            description: `${model.name} download initiated.`,
                          });
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {model.status !== "active" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(model.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Classifier Models */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Classifier Models</span>
              </CardTitle>
              <CardDescription>
                Models for classifying healthy vs diseased leaves
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classifiers.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-gradient-card"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{model.name}</h4>
                        {getStatusBadge(model.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        v{model.version} • {model.size} • {model.accuracy && `${model.accuracy}% acc`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(model.uploadedAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        SHA: {model.sha256}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {model.status !== "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleActivate(model.id)}
                        >
                          Activate
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          // Simulate download
                          const link = document.createElement('a');
                          link.href = '#';
                          link.download = `${model.name.replace(/\s+/g, '_')}_v${model.version}.pt`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          toast({
                            title: "Download started",
                            description: `${model.name} download initiated.`,
                          });
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {model.status !== "active" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(model.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Model Performance Summary */}
        <Card className="mt-8 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Active Model Performance</span>
            </CardTitle>
            <CardDescription>
              Current performance metrics for active models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-medium">Autoencoder Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Reconstruction Loss</span>
                    <div className="font-medium">0.0234</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Threshold</span>
                    <div className="font-medium">0.165</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">True Positive Rate</span>
                    <div className="font-medium">91.2%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">False Positive Rate</span>
                    <div className="font-medium">4.8%</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Classifier Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Overall Accuracy</span>
                    <div className="font-medium">94.2%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Precision</span>
                    <div className="font-medium">92.8%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Recall</span>
                    <div className="font-medium">95.1%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">F1 Score</span>
                    <div className="font-medium">0.939</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}