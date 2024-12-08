import { NavLink, useNavigate } from "react-router";
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
        {isAuthenticated ? (
          <NavLink to="/" className="text-xl hover:text-green-400">
            Todo List App
          </NavLink>
        ) : (
          <p className="text-xl cursor-pointer hover:text-green-400">Todo List App</p>
        )}

        {isAuthenticated && (
          <div className={"flex flex-row items-center justify-end gap-1"}>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-1 rounded-md w-full text-center text-green-400 transition-all duration-300 ease-in-out"
                  : "px-4 py-1 rounded-md w-full text-center hover:text-green-400 transition-all duration-300 ease-in-out"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-1 rounded-md w-full text-center text-green-400 transition-all duration-300 ease-in-out"
                  : "px-4 py-1 rounded-md w-full text-center hover:text-green-400 transition-all duration-300 ease-in-out"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to={"/logout"}
              onClick={() => handleLogout()}
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-1 rounded-md w-full text-center text-green-400 transition-all duration-300 ease-in-out"
                  : "px-4 py-1 rounded-md w-full text-center hover:text-green-400 transition-all duration-300 ease-in-out"
              }
            >
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
