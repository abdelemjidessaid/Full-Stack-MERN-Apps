import { Link, useNavigate } from "react-router";
import * as apiClient from "../apiClient";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await apiClient.logout();

    if (!response.ok) {
      toast.error("Error occured during logout!");
      return;
    }

    logout();
    navigate("/login");
  };

  return (
    <div className="border-b border-gray-800 w-full">
      <div className="container w-full mx-auto flex flex-col md:flex-row items-center justify-between py-4 gap-3">
        <p className="text-xl">Todo List App</p>

        {isAuthenticated && (
          <div className={"flex flex-row items-center justify-end gap-1"}>
            <Link
              to={"/"}
              className="px-4 py-1 rounded-md w-full text-center hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link
              to={"/profile"}
              className="px-4 py-1 rounded-md w-full text-center hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              Profile
            </Link>
            <Link
              to={"/logout"}
              onClick={() => handleLogout()}
              className="px-4 py-1 rounded-md w-full text-center hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
