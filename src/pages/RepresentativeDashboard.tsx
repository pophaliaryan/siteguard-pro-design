import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardCheck,
  MapPin,
  Plus,
  FileText,
  LogOut,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";

const RepresentativeDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useRole();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out.",
    });
  };

  const todayInspections = [
    { id: 1, site: "Downtown Tower - Phase 2", time: "09:00 AM", status: "pending" },
    { id: 2, site: "Harbor Bridge Extension", time: "11:30 AM", status: "pending" },
    { id: 3, site: "Riverside Complex", time: "02:00 PM", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">Representative Dashboard</h1>
              <p className="text-sm text-muted-foreground font-body">Conduct site inspections</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="gradient" onClick={() => navigate("/site-selection")}>
              <Plus className="mr-2 h-4 w-4" />
              New Inspection
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Card className="p-6 shadow-card animate-fade-in bg-gradient-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-2">Ready to Inspect?</h2>
              <p className="font-body opacity-90">Select a site to begin your inspection</p>
            </div>
            <Button variant="secondary" size="lg" onClick={() => navigate("/site-selection")}>
              <MapPin className="mr-2 h-5 w-5" />
              Select Site
            </Button>
          </div>
        </Card>

        <Card className="p-6 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Today's Schedule</h2>
              <p className="text-sm text-muted-foreground font-body">Planned inspections</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {todayInspections.map((inspection) => (
              <div 
                key={inspection.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-foreground mb-1">{inspection.site}</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Scheduled: {inspection.time}
                  </p>
                </div>
                <Button 
                  variant="gradient" 
                  size="sm"
                  onClick={() => navigate("/site-selection")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Start
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">My Recent Reports</h2>
              <p className="text-sm text-muted-foreground font-body">View submitted inspections</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/reports")}>
              <FileText className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
          <div className="text-center py-8 text-muted-foreground font-body">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No reports submitted yet</p>
            <p className="text-sm mt-1">Start an inspection to create your first report</p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default RepresentativeDashboard;
