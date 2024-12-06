import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../apiClient";
import { toast } from "react-toastify";

const Navbar = () => {
  const { loggedIn, setLoggedIn, expanded, setExpanded } = useAppContext();

  const handleLogout = async () => {
    const response = await apiClient.logOut();
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setLoggedIn(false);
  };

  return (
    <div className="border-b border-gray-800 w-full">
      <div className="container w-full mx-auto flex flex-row items-center justify-between py-4">
        <p className="text-xl">Todo List App</p>
        {loggedIn && (
          <div
            className={`md:relative flex flex-col gap-2 md:flex-row ${
              expanded
                ? "fixed h-screen overflow-auto top-[61px] left-0 z-50 bg-white bg-opacity-5 backdrop-blur-sm w-full"
                : ""
            }`}
          >
            <div className="flex flex-col items-end transition-all duration-300 ease-in-out">
              <Menu
                onClick={() => setExpanded(!expanded)}
                className={`${
                  expanded ? "hidden" : "block md:hidden"
                } transition-all duration-300 ease-in-out`}
              />
              <X
                onClick={() => setExpanded(!expanded)}
                className={`${
                  expanded ? "block md:hidden" : "hidden"
                } cursor-pointer self-start w-fit m-3 transition-all duration-300 ease-in-out`}
              />
            </div>
            <div className={`${expanded ? "flex flex-col items-center gap-1" : "hidden md:block"}`}>
              <Link
                to={"/"}
                onClick={() => setExpanded(false)}
                className="px-4 py-1 rounded-md w-full text-center hover:bg-gray-700 transition-all duration-300 ease-in-out"
              >
                Home
              </Link>
              <Link
                to={"/profile"}
                onClick={() => setExpanded(false)}
                className="px-4 py-1 rounded-md w-full text-center hover:bg-gray-700 transition-all duration-300 ease-in-out"
              >
                Profile
              </Link>
              <Link
                to={"/logout"}
                onClick={() => {
                  setExpanded(false);
                  handleLogout();
                }}
                className="px-4 py-1 rounded-md w-full text-center hover:bg-gray-700 transition-all duration-300 ease-in-out"
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
