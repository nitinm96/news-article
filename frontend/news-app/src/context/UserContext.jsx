import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
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

  useEffect(() => {
    console.log("Fetching user...");
    console.log(user);
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
