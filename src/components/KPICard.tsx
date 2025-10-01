import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "warning" | "destructive";
}

export const KPICard = ({ title, value, icon: Icon, trend, color = "primary" }: KPICardProps) => {
  const colorClasses = {
    primary: "bg-gradient-primary text-primary-foreground",
    secondary: "bg-gradient-success text-secondary-foreground",
    warning: "bg-warning text-warning-foreground",
    destructive: "bg-destructive text-destructive-foreground",
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 transform hover:scale-105 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={`text-sm font-mono font-semibold ${trend.isPositive ? 'text-secondary' : 'text-destructive'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <h3 className="text-sm font-body text-muted-foreground mb-1">{title}</h3>
      <p className="text-3xl font-heading font-bold text-foreground font-mono">{value}</p>
    </Card>
  );
};
