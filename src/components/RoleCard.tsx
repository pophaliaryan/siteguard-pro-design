import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onSelect: () => void;
}

export const RoleCard = ({ title, description, icon: Icon, onSelect }: RoleCardProps) => {
  return (
    <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 transform hover:scale-105 cursor-pointer group animate-fade-in-up">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-full bg-gradient-primary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground">{title}</h3>
        <p className="text-sm font-body text-muted-foreground">{description}</p>
        <Button onClick={onSelect} variant="gradient" className="w-full">
          Continue as {title}
        </Button>
      </div>
    </Card>
  );
};
