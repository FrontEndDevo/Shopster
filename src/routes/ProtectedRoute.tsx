// React Hooks:
import React, { useEffect } from "react";

// Redux Hooks:
import { useAppSelector } from "@/store/hooks";

// React Router Hooks:
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return <>{children}</>;
};

export default ProtectedRoute;
