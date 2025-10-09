import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ permissionId, children }) => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("authenticated");

    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  const permissions =
    JSON.parse(localStorage.getItem("user_permissions")) || [];

  if (permissionId && !permissions.includes(permissionId)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
