import { useState, useRef } from "react";
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
  Send,
  X,
  Plus
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const MobileChecklist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const site = location.state?.site;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [checklistItems, setChecklistItems] = useState({
    safety_equipment: false,
    site_secured: false,
    materials_stored: false,
    waste_managed: false,
    equipment_operational: false,
  });
  
  const [photos, setPhotos] = useState<string[]>([]);
  const [issues, setIssues] = useState<Array<{priority: string, description: string}>>([]);
  const [currentIssue, setCurrentIssue] = useState({ priority: "", description: "" });

  const handleToggle = (key: string) => {
    setChecklistItems(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof checklistItems],
    }));
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
            toast.success("Photo captured!", {
              description: "Photo added to inspection report",
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    toast.info("Photo removed");
  };

  const handleAddIssue = () => {
    if (currentIssue.priority && currentIssue.description) {
      setIssues(prev => [...prev, currentIssue]);
      setCurrentIssue({ priority: "", description: "" });
      toast.success("Issue logged!", {
        description: "Issue added to inspection report",
      });
    } else {
      toast.error("Please fill in all issue fields");
    }
  };

  const removeIssue = (index: number) => {
    setIssues(prev => prev.filter((_, i) => i !== index));
    toast.info("Issue removed");
  };

  const handleSubmit = () => {
    const completedItems = Object.values(checklistItems).filter(Boolean).length;
    toast.success("Inspection submitted successfully!", {
      description: `${completedItems} items checked, ${photos.length} photos, ${issues.length} issues logged`,
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
            <p className="text-xs text-muted-foreground font-body">{site?.name || "Select a site"}</p>
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
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoCapture}
          />
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture/Upload Photos
          </Button>
          
          {photos.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={photo} 
                    alt={`Captured ${index + 1}`} 
                    className="w-full aspect-square object-cover rounded-lg border border-border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-xs text-muted-foreground font-body mt-2">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'} captured
          </p>
        </Card>

        {/* Issue Logging */}
        <Card className="p-5 shadow-card animate-fade-in">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-5 w-5 text-warning mr-2" />
            <h2 className="text-lg font-heading font-bold text-foreground">Log Issues</h2>
          </div>
          
          {issues.length > 0 && (
            <div className="space-y-2 mb-4">
              {issues.map((issue, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-primary uppercase">{issue.priority} Priority</span>
                      <p className="text-sm font-body text-foreground mt-1">{issue.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeIssue(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-2 block">
                Priority
              </label>
              <Select value={currentIssue.priority} onValueChange={(value) => setCurrentIssue({...currentIssue, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
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
                value={currentIssue.description}
                onChange={(e) => setCurrentIssue({...currentIssue, description: e.target.value})}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAddIssue}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Issue
            </Button>
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
