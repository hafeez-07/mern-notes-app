import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { updateUser, uploadProfile } from "../api/userApi";
import { toast } from "sonner";
import { MdEmail } from "react-icons/md";
import { FaCamera } from "react-icons/fa";

type UserForm = {
  fullname: string;
  username: string;
  email: string;
  age: string;
};

const Settings = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState<UserForm>({
    fullname: "",
    username: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        age: user.age ? String(user.age) : "",
      });
    }
  }, [user]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const previousUser = user;

    const dataToSubmit = {
      ...formData,
      age: formData.age === "" ? 0 : Number(formData.age),
    };

    setUser(dataToSubmit);

    try {
      const updatedUser = await updateUser(dataToSubmit);
      setUser(updatedUser);
      toast.success("Personal Info updated", {
        duration: 1000,
      });
    } catch (err) {
      setUser(previousUser);
      if (err instanceof Error) {
        toast.error(err.message);
        console.log(err.message);
      } else {
        toast.error("something went wrong");
        console.log("unknown error :", err);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previousImage = user?.imageUrl;

    //instant preview
    const previewURL = URL.createObjectURL(file);

    //show preview
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        imageUrl: previewURL,
      };
    });

    // Upload in background
    try {
      const data = await uploadProfile(file);

      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          imageUrl: data.imageUrl, // Replace with actual URL from server
        };
      });
      URL.revokeObjectURL(previewURL);
      toast.success("Profile image updated", {
        duration: 1000,
      });
    } catch (err) {
      toast.error("could not upload profile image");
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          imageUrl: previousImage,
        };
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3">
      <h2 className="text-2xl font-semibold">Account Settings</h2>
      <p className="mt-1 text-zinc-400">
        Update your profile details and account preferences.
      </p>
      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-12">
        <div className="shadow-lg space-y-1 shadow-black flex flex-col gap-1 items-center border py-5 px-20 border-zinc-800 bg-zinc-900 rounded-2xl">
          <div className="w-32 h-32 rounded-full mb-4">
            <img
              src={user?.imageUrl}
              alt="dp"
              className="w-32 h-32 object-cover rounded-[50%] ring-3 ring-orange-400"
            />
          </div>

          <div className="text-lg font-semibold">{user?.fullname}</div>
          <div className="text-zinc-400">@{user?.username}</div>
          <div className="flex items-center gap-1 ">
            <MdEmail />
            <div>{user?.email}</div>
          </div>
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-linear-to-br from-blue-500 to-blue-600  p-3 rounded text-center  w-full"
          >
            <FaCamera />
            <div>Change photo</div>
          </button>

          <input
            type="file"
            name="profile"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col  grow gap-4 border border-zinc-800 bg-zinc-900 rounded-2xl p-5 sm:p-10"
        >
          <div className="grid gap-1">
            <label className="text-sm text-zinc-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={inputHandler}
              className="input-field"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-400">Fullname</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={inputHandler}
              className="input-field"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
              className="input-field"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm text-zinc-400">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={inputHandler}
              className="input-field"
            />
          </div>
          <input type="submit" className="submit-button" />
        </form>
      </div>
      <div className="border border-red-950 bg-red-900/20 p-5 rounded  mt-10">
        <h3 className="text-red-600 text-xl">Danger zone ⚠️</h3>

        <div className="flex justify-between mt-3">
          <p className="text-red-400">
            This action is irreversible. Your account and all associated data
            will be permanently deleted.
          </p>
          <button className="destructive-button">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
