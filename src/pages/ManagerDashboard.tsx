import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  MapPin,
  Users,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { useToast } from "@/hooks/use-toast";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useRole();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your manager account.",
    });
  };

  const kpis = [
    {
      title: "My Sites",
      value: "12",
      icon: Building2,
      trend: { value: "8%", isPositive: true },
      color: "primary" as const,
    },
    {
      title: "Completed Today",
      value: "23",
      icon: CheckCircle,
      trend: { value: "15%", isPositive: true },
      color: "secondary" as const,
    },
    {
      title: "Issues to Review",
      value: "5",
      icon: AlertTriangle,
      trend: { value: "2%", isPositive: false },
      color: "warning" as const,
    },
  ];

  const assignedSites = [
    { id: 1, name: "Downtown Tower - Phase 2", status: "completed" as const, inspections: 12 },
    { id: 2, name: "Harbor Bridge Extension", status: "in-progress" as const, inspections: 8 },
    { id: 3, name: "Riverside Complex", status: "pending" as const, inspections: 5 },
    { id: 4, name: "Airport Expansion Wing C", status: "completed" as const, inspections: 15 },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">Manager Dashboard</h1>
              <p className="text-sm text-muted-foreground font-body">Oversee sites and review reports</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/geofence-manager")}>
              <MapPin className="mr-2 h-4 w-4" />
              View Sites
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/reports")}>
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
            <div 
              key={kpi.title}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <KPICard {...kpi} />
            </div>
          ))}
        </div>

        <Card className="p-6 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Assigned Sites</h2>
              <p className="text-sm text-muted-foreground font-body">Sites under your supervision</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedSites.map((site) => (
              <Card 
                key={site.id}
                className="p-4 cursor-pointer hover:shadow-elevated transition-all duration-300"
                onClick={() => navigate("/geofence-manager")}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-body font-semibold text-foreground">{site.name}</h3>
                  <StatusBadge status={site.status} />
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  {site.inspections} inspections completed
                </p>
                <Button variant="outline" size="sm" className="w-full mt-4" onClick={(e) => {
                  e.stopPropagation();
                  navigate("/reports");
                }}>
                  View Reports
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Site Locations</h2>
              <p className="text-sm text-muted-foreground font-body">View geofenced boundaries</p>
            </div>
          </div>
          <div 
            className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => navigate("/geofence-manager")}
          >
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-3 animate-bounce-subtle" />
              <p className="text-muted-foreground font-body">Click to view site map</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ManagerDashboard;
