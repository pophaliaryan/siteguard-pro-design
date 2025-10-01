import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleCard } from "@/components/RoleCard";
import { Shield, Users, ClipboardCheck } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Full system access and configuration",
      icon: Shield,
    },
    {
      id: "manager",
      title: "Manager",
      description: "Oversee sites and review reports",
      icon: Users,
    },
    {
      id: "representative",
      title: "Representative",
      description: "Conduct site inspections and checklists",
      icon: ClipboardCheck,
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    // Simulate login delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Construction site" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-3 animate-fade-in">
            SiteGuard
          </h1>
          <p className="text-lg md:text-xl font-body text-primary-foreground/90 animate-fade-in-up">
            Construction Site Geofencing & Reporting
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-3">
            Select Your Role
          </h2>
          <p className="text-muted-foreground font-body">
            Choose how you'll access the platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <div 
              key={role.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RoleCard
                title={role.title}
                description={role.description}
                icon={role.icon}
                onSelect={() => handleRoleSelect(role.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 px-4">
        <p className="text-sm text-muted-foreground font-body">
          Secure enterprise-grade construction management platform
        </p>
      </div>
    </div>
  );
};

export default Login;
