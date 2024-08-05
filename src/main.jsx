import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const backendUrl = (import.meta.env.VITE_BACKEND_ENVIRONMENT_TYPE && import.meta.env.VITE_BACKEND_ENVIRONMENT_TYPE === "DEVELOPMENT") ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_PROD_URL;

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        backendUrl
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
