import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import RoleManagement from "../../pages/RoleManagement/RoleManagement";
import UserManagement from "../../pages/UserManagement/UserManagement";

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
        path="/rolemanagement"
        element={
          <PrivateRoute>
            <RoleManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AllRoutes;
