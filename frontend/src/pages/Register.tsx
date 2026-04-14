import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { RegisteredUser } from "../types/user.ts";
import { registerUser } from "../api/authApi.ts";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth.ts";
import type { RegisterError } from "../types/error.ts";
import { isApiError } from "../utils/api.ts";
import illustration from "../../public/images/note_illustration.png";
import { FaCheck } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState<RegisteredUser>({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterError>({});

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
    setErrors({});
    try {
      const user = await registerUser(formData);
      toast.success("Registered successfully", {
        duration: 1000,
      });

      setUser(user);
      navigate("/app");
    } catch (err: unknown) {
      if (isApiError(err)) {
        if (err.field) {
          setErrors({
            [err.field]: err.error,
          });
        } else {
          setErrors({
            general: err.error,
          });
        }
      } else {
        setErrors({
          general: "something went wrong",
        });
      }
    }
  };

  //   return (
  //     <div className="flex items-center justify-between min-h-screen w-screen bg-linear-to-tr from-zinc-600 to-zinc-700 via-zinc-800">
  //       <div className="mx-auto w-md rounded-2xl border border-white/10 bg-white/20 p-5 shadow-2xl backdrop-blur-lg">
  //         <h2 className="mt-2 mb-8 text-center text-3xl font-semibold">
  //           Register Account
  //         </h2>
  //         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
  //           {errors.general && (
  //             <div className="error-message text-center">{errors.general}</div>
  //           )}

  //           <input
  //             type="text"
  //             name="fullname"
  //             value={formData.fullname}
  //             onChange={handleChange}
  //             placeholder="Full Name"
  //             className="input-field"
  //           />

  //           <div className="flex flex-col">
  //             <input
  //               type="text"
  //               name="username"
  //               value={formData.username}
  //               onChange={handleChange}
  //               placeholder="Username"
  //               className="input-field"
  //               required
  //             />
  //             <div
  //               aria-live="polite"
  //               className={`overflow-hidden transition-all duration-300 ease-out ${
  //                 errors.username
  //                   ? "mt-1 max-h-8 opacity-100"
  //                   : "mt-0 max-h-0 opacity-0"
  //               }`}
  //             >
  //               <p className="error-message">{errors.username}</p>
  //             </div>
  //           </div>

  //           <div className="flex flex-col">
  //             <input
  //               type="email"
  //               name="email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               placeholder="email"
  //               className="input-field"
  //               required
  //             />
  //             <div
  //               aria-live="polite"
  //               className={`overflow-hidden transition-all duration-300 ease-out ${
  //                 errors.email
  //                   ? "mt-1 max-h-8 opacity-100"
  //                   : "mt-0 max-h-0 opacity-0"
  //               }`}
  //             >
  //               <p className="error-message">{errors.email}</p>
  //             </div>
  //           </div>
  //           <input
  //             type="password"
  //             name="password"
  //             value={formData.password}
  //             onChange={handleChange}
  //             placeholder="password"
  //             className="input-field"
  //             required
  //           />
  //           <input
  //             type="submit"
  //             value="Register"
  //             className="submit-button px-1"
  //           />
  //         </form>
  //         <div className="mt-2 text-center">
  //           Already have an account?
  //           <Link to="/" className="text-blue-600">
  //             {" "}
  //             login
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="flex min-h-screen w-screen bg-black">
      {/* LEFT SIDE (60%) */}
      <div className="relative hidden h-screen w-[60%] items-center justify-center overflow-hidden bg-black md:flex">
        {/* Image */}
        <img
          src={illustration}
          alt="Notes illustration"
          className="h-screen w-full object-cover opacity-80"
        />
        <div className="absolute top-20 flex flex-col gap-4 px-4">
          <h2 className="text-4xl font-bold text-orange-500">
            Capture your ideas ✍🏻
          </h2>
          <p className="text-xl font-semibold text-zinc-400">
            Write, organize and access your notes anytime, anywhere
          </p>
          <div className="flex flex-col gap-1 text-zinc-400">
            <div className="flex items-center gap-2">
              <FaCheck className="text-orange-500" />
              <p>Fast & simple note taking</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-orange-500" />
              <p>Secure authentication</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-orange-500" />
              <p>Clean & distraction free UI</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (40%) */}
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-zinc-900 via-zinc-800 to-black px-6 md:w-[40%]">
        <div className="h absolute top-1/2 -left-20 h-100 w-100 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl"></div>
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-center text-xl font-semibold text-white">
            Register account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {errors.general && (
              <div className="error-message text-center">{errors.general}</div>
            )}{" "}
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="auth-input-field"
            />
            <div className="flex flex-col">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="auth-input-field"
                required
              />
              <div
                aria-live="polite"
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  errors.username
                    ? "mt-1 max-h-8 opacity-100"
                    : "mt-0 max-h-0 opacity-0"
                }`}
              >
                <p className="error-message">{errors.username}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                className="auth-input-field"
                required
              />
              <div
                aria-live="polite"
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  errors.email
                    ? "mt-1 max-h-8 opacity-100"
                    : "mt-0 max-h-0 opacity-0"
                }`}
              >
                <p className="error-message">{errors.email}</p>
              </div>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="auth-input-field"
              required
            />
            <input
              type="submit"
              value="Register"
              className="auth-submit-button "
            />
          </form>

          <div className="mt-4 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link to="/" className="text-orange-400 hover:underline">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
