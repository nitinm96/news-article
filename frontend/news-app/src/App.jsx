import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Favorites from "./components/Favorites";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
