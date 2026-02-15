import { useAuth } from "@/provider/auth-context";
import { Navigate, Outlet } from "react-router";
import { SpinnerCustom } from "@/components/ui/spinner";

const Authlayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SpinnerCustom />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default Authlayout;
