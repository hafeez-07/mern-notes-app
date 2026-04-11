import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";
import type { Note } from "../types/note";
import useAuth from "../../hooks/useAuth.ts";

type Props = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

const Navbar = ({ setNotes }: Props) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setNotes([]);
      setUser(null);
      navigate("/");
    } catch (err) {
      throw new Error("Something went wrong");
    }
  };

  return (
    <div className="border-b border-zinc-600 bg-gray-950 px-5 py-2 text-white">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notes App</h1>

        <div className="flex items-center gap-5">
          <div>{user?.username}</div>
          <NavLink to="/app" className="hover:text-orange-400">
            Home
          </NavLink>
          <NavLink to="settings">Settings</NavLink>
          <button onClick={handleLogout} className="destructive-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
