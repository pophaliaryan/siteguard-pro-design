import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Download, Printer, Share2, Camera, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ReportDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const report = {
    id: id,
    site: "Downtown Tower - Phase 2",
    date: "2025-09-28",
    time: "10:30 AM",
    status: "completed" as const,
    inspector: "John Smith",
    location: "350 5th Ave, New York, NY",
    checklist: [
      { item: "Safety Equipment Present", status: "passed" },
      { item: "Site Properly Secured", status: "passed" },
      { item: "Materials Properly Stored", status: "passed" },
      { item: "Waste Management", status: "passed" },
      { item: "Equipment Operational", status: "passed" },
    ],
    issues: [
      { id: 1, priority: "Medium", description: "Damaged safety barrier near east entrance", status: "Open" },
      { id: 2, priority: "Low", description: "Missing signage on floor 3", status: "In Progress" },
    ],
    photos: 5,
    notes: "All major safety protocols are being followed. Minor maintenance issues have been logged and assigned to relevant teams.",
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Report PDF is being generated...",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Preview",
      description: "Opening print dialog...",
    });
    window.print();
  };

  const handleShare = () => {
    toast({
      title: "Share Report",
      description: "Share link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border shadow-card print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">Inspection Report</h1>
              <p className="text-sm text-muted-foreground font-body">Report #{id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="gradient" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Report Header */}
        <Card className="p-6 shadow-card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">{report.site}</h2>
              <p className="text-muted-foreground font-body">{report.location}</p>
            </div>
            <StatusBadge status={report.status} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground font-body mb-1">Inspector</p>
              <p className="font-body font-semibold text-foreground">{report.inspector}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body mb-1">Date</p>
              <p className="font-body font-semibold text-foreground">{report.date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body mb-1">Time</p>
              <p className="font-body font-semibold text-foreground">{report.time}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body mb-1">Photos</p>
              <p className="font-body font-semibold text-foreground">{report.photos} captured</p>
            </div>
          </div>
        </Card>

        {/* Checklist Results */}
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-heading font-bold text-foreground mb-4">Safety Checklist</h3>
          <div className="space-y-3">
            {report.checklist.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <p className="font-body text-foreground">{item.item}</p>
                <Badge variant={item.status === "passed" ? "default" : "destructive"}>
                  {item.status === "passed" ? "✓ Passed" : "✗ Failed"}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Issues Logged */}
        {report.issues.length > 0 && (
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-xl font-heading font-bold text-foreground">Issues Identified</h3>
            </div>
            <div className="space-y-3">
              {report.issues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={issue.priority === "High" ? "destructive" : issue.priority === "Medium" ? "default" : "secondary"}>
                      {issue.priority} Priority
                    </Badge>
                    <Badge variant="outline">{issue.status}</Badge>
                  </div>
                  <p className="font-body text-foreground">{issue.description}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Photos */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-heading font-bold text-foreground">Photo Documentation</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((photoNum) => (
              <div key={photoNum} className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        {/* Inspector Notes */}
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-heading font-bold text-foreground mb-4">Inspector Notes</h3>
          <p className="font-body text-foreground leading-relaxed">{report.notes}</p>
        </Card>
      </main>
    </div>
  );
};

export default ReportDetail;
