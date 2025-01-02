import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./UseContext/context";

const RequireAuth = () => {
  const { UserName } = useContext(Context);
  const location = useLocation();
  return UserName?.first_name ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
