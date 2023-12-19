import React, { useState, createContext } from "react";
import { login, signup, getUserDetails } from "../api/movies-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFavorites, setUserFavorites] = useState([]);
  const [userWatchlist, setUserWatchlist] = useState([]);


  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (email, password) => {
    const result = await login(email, password);
    const username = email;
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserEmail(email);

      const user = await getUserDetails(username, authToken);
      const userID = user._id;
      setUserId(userID);
      console.log("2 " + userID)

      setUserFavorites(user.favorites || []);
      setUserWatchlist(user.watchlist || []);

    }
  };

  const register = async (email, password) => {
    const result = await signup(email, password);
    return (result.success === true) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userId,
        userEmail
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;