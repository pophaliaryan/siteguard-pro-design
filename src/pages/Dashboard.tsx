import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  MapPin,
  FileText,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const kpis = [
    {
      title: "Active Sites",
      value: "24",
      icon: Building2,
      trend: { value: "12%", isPositive: true },
      color: "primary" as const,
    },
    {
      title: "Completed Checks",
      value: "156",
      icon: CheckCircle,
      trend: { value: "8%", isPositive: true },
      color: "secondary" as const,
    },
    {
      title: "Open Issues",
      value: "7",
      icon: AlertTriangle,
      trend: { value: "3%", isPositive: false },
      color: "warning" as const,
    },
    {
      title: "Active Users",
      value: "42",
      icon: Users,
      trend: { value: "5%", isPositive: true },
      color: "primary" as const,
    },
  ];

  const recentReports = [
    {
      id: 1,
      site: "Downtown Tower - Phase 2",
      date: "2025-09-28",
      status: "completed" as const,
      inspector: "John Smith",
    },
    {
      id: 2,
      site: "Harbor Bridge Extension",
      date: "2025-09-27",
      status: "in-progress" as const,
      inspector: "Sarah Johnson",
    },
    {
      id: 3,
      site: "Riverside Complex",
      date: "2025-09-27",
      status: "pending" as const,
      inspector: "Mike Chen",
    },
    {
      id: 4,
      site: "Airport Expansion Wing C",
      date: "2025-09-26",
      status: "overdue" as const,
      inspector: "Emily Davis",
    },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">SiteGuard</h1>
            <p className="text-sm text-muted-foreground font-body">Construction Management Dashboard</p>
          </div>
          <Button variant="gradient" onClick={() => navigate("/mobile-checklist")}>
            <Plus className="mr-2 h-4 w-4" />
            New Inspection
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <div 
              key={kpi.title}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <KPICard {...kpi} />
            </div>
          ))}
        </div>

        {/* Map Preview */}
        <Card className="p-6 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Site Map</h2>
              <p className="text-sm text-muted-foreground font-body">Active geofenced locations</p>
            </div>
            <Button variant="outline" size="sm">
              <MapPin className="mr-2 h-4 w-4" />
              View All Sites
            </Button>
          </div>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-3 animate-bounce-subtle" />
              <p className="text-muted-foreground font-body">Interactive map with geofence overlays</p>
              <p className="text-sm text-muted-foreground font-body mt-1">24 active site boundaries</p>
            </div>
          </div>
        </Card>

        {/* Recent Reports */}
        <Card className="p-6 shadow-card animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground">Recent Reports</h2>
              <p className="text-sm text-muted-foreground font-body">Latest site inspections and checklists</p>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-foreground mb-1">{report.site}</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    Inspector: {report.inspector} • {report.date}
                  </p>
                </div>
                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
