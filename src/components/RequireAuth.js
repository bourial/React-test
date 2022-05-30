import { useLocation, Navigate, Outlet } from "react-router-dom";
import jsCookie from "js-cookie";

export default function RequireAuth() {
  const location = useLocation();

  return jsCookie.get("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
