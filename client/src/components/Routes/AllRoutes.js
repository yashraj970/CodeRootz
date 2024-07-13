import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
