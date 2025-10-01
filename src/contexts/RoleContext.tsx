import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = "admin" | "manager" | "representative" | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as Role;
    if (savedRole) {
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem("userRole", newRole);
    } else {
      localStorage.removeItem("userRole");
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <RoleContext.Provider value={{ role, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
