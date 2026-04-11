import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-between bg-linear-to-bl from-zinc-900 to-zinc-800 px-2 text-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
