import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { RegisteredUser } from "../types/user.ts";
import { registerUser } from "../api/authApi.ts";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth.ts";

const Register = () => {
  const [formData, setFormData] = useState<RegisteredUser>({
    fullname: "",
    username: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await registerUser(formData);
      toast.success("registered successfully", {
        duration: 2000,
      });

      setUser(user);
      navigate("/app");
    } catch (err) {
      toast.error("something went wrong", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="mx-auto w-md rounded-2xl bg-black p-5 shadow-zinc-500 transition-all duration-300 ease-in hover:shadow-lg">
      <h2 className="mt-2 mb-8 text-center text-3xl font-semibold">
        Register Account
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Full Name"
          className="input-field"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="input-field"
          required
        />
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
      <div className="mt-2 text-center">
        Already have an account?
        <Link to="/" className="text-blue-600">
          {" "}
          login
        </Link>
      </div>
    </div>
  );
};

export default Register;
