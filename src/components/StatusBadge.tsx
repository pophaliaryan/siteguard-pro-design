import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "completed" | "in-progress" | "pending" | "overdue";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    completed: {
      label: "Completed",
      classes: "bg-secondary/10 text-secondary border-secondary/20",
    },
    "in-progress": {
      label: "In Progress",
      classes: "bg-primary/10 text-primary border-primary/20",
    },
    pending: {
      label: "Pending",
      classes: "bg-muted text-muted-foreground border-border",
    },
    overdue: {
      label: "Overdue",
      classes: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-body border",
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
};
