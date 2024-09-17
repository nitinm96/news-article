import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("accessToken"); //get token from local storage
      //validate token exists
      if (!token) {
        setLoading(false);
        return;
      }
      //send request to get current user with Authorization bearer token
      const response = await axios.get(
        "http://localhost:5001/api/users/current",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data); // Set user state
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  //fetch user on component mount
  useEffect(() => {
    console.log("Fetching user...");
    fetchCurrentUser();
    console.log("Current User: ", user);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
