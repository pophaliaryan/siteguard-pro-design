import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    companyName: "SiteGuard Construction",
    emailNotifications: true,
    smsAlerts: false,
    autoSync: true,
    geofenceRadius: "200",
    reportFormat: "pdf",
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground font-body">System configuration and preferences</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Company Settings */}
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-heading font-bold text-foreground mb-6">Company Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input 
                id="company-name"
                value={settings.companyName}
                onChange={(e) => setSettings({...settings, companyName: e.target.value})}
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-heading font-bold text-foreground mb-6">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground font-body">Receive inspection updates via email</p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Alerts</Label>
                <p className="text-sm text-muted-foreground font-body">Get critical alerts via text message</p>
              </div>
              <Switch 
                checked={settings.smsAlerts}
                onCheckedChange={(checked) => setSettings({...settings, smsAlerts: checked})}
              />
            </div>
          </div>
        </Card>

        {/* Geofencing Settings */}
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-heading font-bold text-foreground mb-6">Geofencing</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="geofence-radius">Default Geofence Radius (meters)</Label>
              <Input 
                id="geofence-radius"
                type="number"
                value={settings.geofenceRadius}
                onChange={(e) => setSettings({...settings, geofenceRadius: e.target.value})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Sync</Label>
                <p className="text-sm text-muted-foreground font-body">Automatically sync when in geofence range</p>
              </div>
              <Switch 
                checked={settings.autoSync}
                onCheckedChange={(checked) => setSettings({...settings, autoSync: checked})}
              />
            </div>
          </div>
        </Card>

        {/* Report Settings */}
        <Card className="p-6 shadow-card">
          <h2 className="text-xl font-heading font-bold text-foreground mb-6">Reports</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-format">Default Report Format</Label>
              <select 
                id="report-format"
                className="w-full mt-2 px-3 py-2 rounded-lg border border-border bg-background"
                value={settings.reportFormat}
                onChange={(e) => setSettings({...settings, reportFormat: e.target.value})}
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="word">Word Document</option>
              </select>
            </div>
          </div>
        </Card>

        <Button variant="gradient" className="w-full" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </main>
    </div>
  );
};

export default Settings;
