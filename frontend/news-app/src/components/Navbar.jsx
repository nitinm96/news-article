import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Logo from "../assets/articleLogo.png";

function Navbar() {
  const { user, setUser, loading } = useContext(UserContext);

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };
  return (
    <div className="sticky top-0 z-30">
      <nav
        id="nav-container"
        className=" sticky flex items-center justify-between h-28 top-0 left-0 w-full shadow-md bg-white z-30"
      >
        <div className="flex items-center justify-start w-full m-10">
          <Link to="/home">
            <img src={Logo} width={250} className="object-contain" />
          </Link>
          <div className="flex items-center justify-end w-full">
            {user && (
              <div>
                <button className="px-4 mx-5 text-xl hover:underline font-bold">
                  <Link to="/favorites">Favorties</Link>
                </button>
              </div>
            )}

            {user ? (
              <div>
                <button
                  className="px-4 mx-5 text-xl hover:p-4 hover:bg-gray-200 rounded-full ease-in-out transition-all duration-200"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 mx-5 text-xl hover:p-4 hover:bg-gray-200 rounded-full ease-in-out transition-all duration-200">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
