import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Star from "@mui/icons-material/Star";

function navbar() {
  const { user, setUser, loading } = useContext(UserContext);

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <div className="sticky top-0 z-30">
      <nav
        id="nav-container"
        className=" sticky flex items-center justify-between h-28 top-0 left-0 w-full bg-white shadow-md z-30"
      >
        <div className="flex items-center justify-between w-full m-10">
          <Link to="/home">
            <div className="text-4xl text-rose-500">LOGO</div>
          </Link>
          <div className="flex justify-center w-full">
            <div className="relative w-2/4">
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search"
              />
            </div>
          </div>
          {user && (
            <div>
              <button className="px-4 mx-5 text-xl hover:underline">
                <Link to="/favorites">Favorties</Link>
              </button>
            </div>
          )}
          {user ? (
            <div>
              <button
                className="border-2 border-black rounded-md px-4 mx-5 text-xl font-bold hover:bg-red-600 hover:border-red-600 ease-in-out transition-colors duration-200"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button className="px-4 mx-5">
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default navbar;
