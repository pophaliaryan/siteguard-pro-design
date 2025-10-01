import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import RepresentativeDashboard from "./RepresentativeDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { role } = useRole();

  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, [role, navigate]);

  if (!role) {
    return null;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "manager") {
    return <ManagerDashboard />;
  }

  if (role === "representative") {
    return <RepresentativeDashboard />;
  }

  return null;
};

export default Dashboard;
