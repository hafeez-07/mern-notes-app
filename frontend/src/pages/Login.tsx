import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LoggedInUser } from "../types/user";
import { loginUser } from "../api/authApi";

const Login = () => {
  const [formData, setFormData] = useState<LoggedInUser>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("something went wrong");
      }
    }
  };

  return (
    <div className="mx-auto w-md bg-black p-5 rounded-2xl hover:shadow-xl shadow-zinc-500">
      <h2 className="text-3xl text-center font-semibold mb-8 mt-2 ">
        Welcome back !
      </h2>
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
        <input type="submit" value="Register" className="submit-button px-1" />
      </form>
      <div className="text-center mt-2">
        Don't have an account?
        <Link to="/register" className="text-blue-600">
          {" "}
          sign in
        </Link>
      </div>
    </div>
  );
};

export default Login;
