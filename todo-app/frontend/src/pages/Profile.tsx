import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as apiClient from "../apiClient";
import { toast } from "react-toastify";

type FormValues = {
  _id: string;
  email: string;
  username: string;
  password: string;
};

const Profile = () => {
  const backendUrl = import.meta.env.VITE_API_BASE_URL;
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.profile();

        const result = await response.json();
        if (!response.ok) {
          toast.error(result.message);
          return;
        }

        const data: FormValues = result;
        form.reset(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const response = await fetch(`${backendUrl}/api/update-profile`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return (
    <div className="my-10 flex flex-col gap-4 items-center justify-center h-full w-full text-sm">
      <h1 className="text-xl">Create Account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 min-w-[300px] w-full md:w-[60%]"
      >
        {/* Username Input */}
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="px-4 py-2 bg-gray-700 rounded-md border border-gray-500 placeholder:font-normal placeholder:text-gray-300"
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "User name is required",
              },
              validate: (value) => {
                return (
                  (value && value.trim().length > 2) || "User name must be more than 2 letters"
                );
              },
            })}
          />
          <p className="text-xs text-red-500 font-semibold self-end mt-1">
            {errors.username?.message}
          </p>
        </div>
        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="px-4 py-2 bg-gray-700 rounded-md border border-gray-500 placeholder:font-normal placeholder:text-gray-300"
            type="email"
            id="email"
            disabled
            {...register("email", {
              required: {
                value: true,
                message: "Email address is required",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          <p className="text-xs text-red-500 font-semibold self-end mt-1">
            {errors.email?.message}
          </p>
        </div>
        {/* Password Input */}
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="px-4 py-2 bg-gray-700 rounded-md border border-gray-500 placeholder:font-normal placeholder:text-gray-300"
            type="password"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              validate: (value) => {
                return (
                  (value && value.trim().length >= 8) ||
                  "Password must contain 8 characters or more"
                );
              },
              // pattern: {
              //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
              //   message:
              //     "Password should contains characters(capital and small letters) and digits",
              // },
            })}
          />
          <p className="text-xs text-red-500 font-semibold self-end mt-1">
            {errors.password?.message}
          </p>
        </div>

        {/* Login Button */}
        <button
          className="px-4 py-2 w-full mt-4 bg-gray-700 text-white font-semibold hover:bg-gray-600 rounded-md transition-all ease-in-out duration-200"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
