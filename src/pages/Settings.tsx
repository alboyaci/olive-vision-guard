import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Settings2, 
  User, 
  Bell, 
  Shield, 
  Database,
  Zap,
  Globe,
  Key,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [jobCompletionAlerts, setJobCompletionAlerts] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(false);
  const [autoDeleteResults, setAutoDeleteResults] = useState(false);
  const [defaultThreshold, setDefaultThreshold] = useState("0.165");
  const [maxConcurrentJobs, setMaxConcurrentJobs] = useState("3");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const generateApiKey = () => {
    const newKey = "ogai_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    toast({
      title: "New API key generated",
      description: `Your new API key: ${newKey}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account preferences and system configuration
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Settings</span>
              </CardTitle>
              <CardDescription>
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="admin@oliveguard.ai" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Istanbul">Istanbul</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your analyses
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Job Completion Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when analysis jobs finish
                  </p>
                </div>
                <Switch
                  checked={jobCompletionAlerts}
                  onCheckedChange={setJobCompletionAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about system maintenance and updates
                  </p>
                </div>
                <Switch
                  checked={systemAlerts}
                  onCheckedChange={setSystemAlerts}
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Settings */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Analysis Configuration</span>
              </CardTitle>
              <CardDescription>
                Set default parameters for your image analysis jobs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-threshold">Default Autoencoder Threshold</Label>
                  <Input
                    id="default-threshold"
                    value={defaultThreshold}
                    onChange={(e) => setDefaultThreshold(e.target.value)}
                    placeholder="0.165"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-jobs">Max Concurrent Jobs</Label>
                  <Select value={maxConcurrentJobs} onValueChange={setMaxConcurrentJobs}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Job</SelectItem>
                      <SelectItem value="2">2 Jobs</SelectItem>
                      <SelectItem value="3">3 Jobs</SelectItem>
                      <SelectItem value="5">5 Jobs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-delete Old Results</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically delete results older than 30 days
                  </p>
                </div>
                <Switch
                  checked={autoDeleteResults}
                  onCheckedChange={setAutoDeleteResults}
                />
              </div>
            </CardContent>
          </Card>

          {/* API Access */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>API Access</span>
              </CardTitle>
              <CardDescription>
                Manage your API keys for programmatic access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Current API Key</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      value="ogai_****************************"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" onClick={generateApiKey}>
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last used: 2 hours ago • Rate limit: 1000 requests/hour
                  </p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">API Usage This Month</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold">1,247</div>
                      <div className="text-muted-foreground">Total Requests</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">892</div>
                      <div className="text-muted-foreground">Images Processed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">99.2%</div>
                      <div className="text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>System Information</span>
              </CardTitle>
              <CardDescription>
                Current system status and resource usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>System Status</Label>
                  <Badge className="bg-success/10 text-success border-success/20">
                    All Systems Operational
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Storage Used</Label>
                  <div className="text-sm">
                    <span className="font-medium">2.3 GB</span> of 10 GB
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Active Workers</Label>
                  <div className="text-sm">
                    <span className="font-medium">2</span> of 5 available
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>OliveGuard AI v2.1.0</p>
                <p>Last updated: January 15, 2024</p>
                <p>Region: US-East-1</p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveSettings}
              className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-success"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}