import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";
// import Loading from './../components/Loading';

function ProtectedRoute(props) {
  const { user, isLoading } = useContext(UserContext);
  const { component: Component } = props;
  if (isLoading) {
    return "<Loading/>";
  }
  if (user) {
    return <Component />
  }
  //redirect if there is no user
  return <Redirect to="/login" />;
}

export default ProtectedRoute;
