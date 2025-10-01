import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronLeft, 
  CheckCircle, 
  Camera, 
  FileText,
  AlertCircle,
  Send
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MobileChecklist = () => {
  const navigate = useNavigate();
  const [checklistItems, setChecklistItems] = useState({
    safety_equipment: false,
    site_secured: false,
    materials_stored: false,
    waste_managed: false,
    equipment_operational: false,
  });

  const handleToggle = (key: string) => {
    setChecklistItems(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof checklistItems],
    }));
  };

  const handleSubmit = () => {
    toast.success("Inspection submitted successfully!", {
      description: "Report generated and saved offline for sync.",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const completedCount = Object.values(checklistItems).filter(Boolean).length;
  const totalCount = Object.values(checklistItems).length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Mobile Header */}
      <header className="bg-card border-b border-border shadow-card sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-heading font-bold text-foreground">Site Inspection</h1>
            <p className="text-xs text-muted-foreground font-body">Downtown Tower - Phase 2</p>
          </div>
          <Button variant="ghost" size="sm">
            <FileText className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-body font-medium text-muted-foreground">Progress</span>
            <span className="text-xs font-mono font-semibold text-primary">{completedCount}/{totalCount}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-success transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Safety Checklist Section */}
        <Card className="p-5 shadow-card animate-fade-in">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-heading font-bold text-foreground">Safety Checklist</h2>
          </div>
          
          <div className="space-y-4">
            <ChecklistItem
              label="Safety Equipment Present"
              description="Hard hats, vests, and first aid kit"
              checked={checklistItems.safety_equipment}
              onToggle={() => handleToggle("safety_equipment")}
            />
            <ChecklistItem
              label="Site Properly Secured"
              description="Fencing and signage in place"
              checked={checklistItems.site_secured}
              onToggle={() => handleToggle("site_secured")}
            />
            <ChecklistItem
              label="Materials Properly Stored"
              description="Organized and protected storage"
              checked={checklistItems.materials_stored}
              onToggle={() => handleToggle("materials_stored")}
            />
            <ChecklistItem
              label="Waste Management"
              description="Debris removal and recycling"
              checked={checklistItems.waste_managed}
              onToggle={() => handleToggle("waste_managed")}
            />
            <ChecklistItem
              label="Equipment Operational"
              description="All machinery functioning properly"
              checked={checklistItems.equipment_operational}
              onToggle={() => handleToggle("equipment_operational")}
            />
          </div>
        </Card>

        {/* Photo Capture */}
        <Card className="p-5 shadow-card animate-fade-in">
          <div className="flex items-center mb-4">
            <Camera className="h-5 w-5 text-primary mr-2" />
            <h2 className="text-lg font-heading font-bold text-foreground">Photo Documentation</h2>
          </div>
          <Button variant="outline" className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Capture Photos
          </Button>
          <p className="text-xs text-muted-foreground font-body mt-2">
            0 photos captured
          </p>
        </Card>

        {/* Issue Logging */}
        <Card className="p-5 shadow-card animate-fade-in">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-5 w-5 text-warning mr-2" />
            <h2 className="text-lg font-heading font-bold text-foreground">Log Issue</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-2 block">
                Priority
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-2 block">
                Description
              </label>
              <Textarea 
                placeholder="Describe the issue..."
                className="resize-none"
                rows={4}
              />
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button 
          variant="gradient" 
          className="w-full h-12 text-base"
          onClick={handleSubmit}
        >
          <Send className="mr-2 h-5 w-5" />
          Submit Inspection
        </Button>
      </main>
    </div>
  );
};

interface ChecklistItemProps {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

const ChecklistItem = ({ label, description, checked, onToggle }: ChecklistItemProps) => {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 mr-4">
        <p className="font-body font-medium text-foreground mb-1">{label}</p>
        <p className="text-sm text-muted-foreground font-body">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
};

export default MobileChecklist;
