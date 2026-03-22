import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoggedInUser } from "../types/user";
import { loginUser } from "../api/authApi";
import useAuth from "../../hooks/useAuth";

const Landing = () => {
  const [formData, setFormData] = useState<LoggedInUser>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await loginUser(formData);

      setUser(userData);
      navigate("/app");
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("something went wrong");
      }
    }
  };

  return (
    <div className="mx-auto w-4xl bg-black p-5 rounded-2xl hover:shadow-lg shadow-zinc-500 transition-all duration-300 ease-in">
      <div className="flex gap-5">
        <div className="text-3xl hidden  font-serif  text-center md:flex flex-col justify-center gap-2">
          <h1>Welcome to notes app</h1>
          <p>Organize your thoughts efficiently</p>
          <p></p>
        </div>
        <div className="grow">
          <h2 className="p-2 text-xl mb-2">Log in to notes app</h2>
          <form onSubmit={submitHandler} className="flex flex-col gap-5 ">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
              className="input-field"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="input-field"
              required
            />
            <input type="submit" value="Login" className="submit-button px-1" />
          </form>
          <div className="text-center mt-2">
            Don't have an account?
            <Link to="/register" className="text-blue-600">
              {" "}
              sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
