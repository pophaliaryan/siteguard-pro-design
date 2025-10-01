import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const users = [
    { id: 1, name: "John Smith", email: "john.smith@siteguard.com", role: "Representative", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@siteguard.com", role: "Representative", status: "active" },
    { id: 3, name: "Mike Chen", email: "mike.chen@siteguard.com", role: "Representative", status: "active" },
    { id: 4, name: "Emily Davis", email: "emily.d@siteguard.com", role: "Manager", status: "active" },
    { id: 5, name: "Robert Wilson", email: "robert.w@siteguard.com", role: "Manager", status: "active" },
    { id: 6, name: "Admin User", email: "admin@siteguard.com", role: "Admin", status: "active" },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">User Management</h1>
              <p className="text-sm text-muted-foreground font-body">Manage team members and roles</p>
            </div>
          </div>
          <Button variant="gradient" onClick={() => toast({ title: "Add User", description: "User creation form coming soon" })}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 shadow-card">
          <div className="space-y-4">
            {users.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-foreground mb-1">{user.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{user.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={user.role === "Admin" ? "default" : user.role === "Manager" ? "secondary" : "outline"}>
                    {user.role}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Edit User", description: `Editing ${user.name}` })}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => toast({ title: "Delete User", description: `Remove ${user.name}?`, variant: "destructive" })}>
                    <Trash2 className="h-4 w-4" />
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

export default UserManagement;
