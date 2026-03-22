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
      toast.success("registered succesfully", {
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
    <div className="mx-auto w-md bg-black p-5 rounded-2xl hover:shadow-lg shadow-zinc-500 transition-all duration-300 ease-in">
      <h2 className="text-3xl text-center font-semibold mb-8 mt-2 ">
        Register Account
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
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
      <div className="text-center mt-2">
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
