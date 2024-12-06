import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAppContext();
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { formState, register, handleSubmit } = form;
  const { errors } = formState;

  const handleLogin = async (data: FormValues) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email as string,
          password: data.password as string,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-10 flex flex-col gap-4 items-center justify-center h-full w-full text-sm">
      <h1 className="text-xl">Login</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-4 min-w-[300px] w-full md:w-[60%]"
      >
        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="px-4 py-2 bg-gray-700 rounded-md border border-gray-500 placeholder:font-normal placeholder:text-gray-300"
            type="email"
            id="email"
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
                return value.trim().length >= 8 || "Password must contain 8 characters or more";
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
          Login
        </button>
        {/* Register Link */}
        <div className="mt-5 text-sm">
          You do not have account ?{" "}
          <Link to="/register" className="text-blue-400">
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
