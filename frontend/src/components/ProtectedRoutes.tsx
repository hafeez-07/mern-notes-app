import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { loading, user } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    return <Navigate to="/" replace/>;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
