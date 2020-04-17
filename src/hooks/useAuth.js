import { useState, useEffect, useContext } from "react";
import UserContext from "../api/UserContext";
import APIHandler from "../api/APIHandler";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    APIHandler
      .get("/is-loggedin")
      .then(res => {
        setCurrentUser(res.data.currentUser);
        setLoggedIn(true);
        setLoading(false);
      })
      .catch(err => {
        setCurrentUser(null);
        setLoggedIn(false);
        setLoading(false);
      })
  }, [setCurrentUser]);

  return {
    isLoading,
    isLoggedIn,
    currentUser
  };
};