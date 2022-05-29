import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    component
  ) : (
    <Navigate  to="/login" />
  );
};

export default PrivateRoute;