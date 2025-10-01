import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();

  const allReports = [
    { id: 1, site: "Downtown Tower - Phase 2", date: "2025-09-28", status: "completed" as const, inspector: "John Smith" },
    { id: 2, site: "Harbor Bridge Extension", date: "2025-09-27", status: "in-progress" as const, inspector: "Sarah Johnson" },
    { id: 3, site: "Riverside Complex", date: "2025-09-27", status: "pending" as const, inspector: "Mike Chen" },
    { id: 4, site: "Airport Expansion Wing C", date: "2025-09-26", status: "overdue" as const, inspector: "Emily Davis" },
    { id: 5, site: "Central Park Site A", date: "2025-09-25", status: "completed" as const, inspector: "John Smith" },
    { id: 6, site: "Marina Bay Development", date: "2025-09-24", status: "completed" as const, inspector: "Sarah Johnson" },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">All Reports</h1>
            <p className="text-sm text-muted-foreground font-body">Inspection history and reports</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 shadow-card">
          <div className="space-y-4">
            {allReports.map((report) => (
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
                <div className="flex items-center gap-3">
                  <StatusBadge status={report.status} />
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Reports;
