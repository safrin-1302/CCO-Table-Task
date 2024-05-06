import React, { useState, useEffect } from "react";
import LogInPage from "./components/logInPage";
import { Routes, Route } from "react-router-dom";
import MyTable from "./components/MyTable";
import SignUp from "./components/SignUp";

const App = () => {
  // Set the initial state to false if no login status is found in local storage
  const [permission, setPermission] = useState(() => {
    const storedPermission = localStorage.getItem("isLoggedIn");
    return storedPermission ? JSON.parse(storedPermission) : false;
  });

  // Update local storage when permission state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(permission));
  }, [permission]);

  return (
    <>
      <Routes>
        {!permission && (
          <Route
            path="/"
            element={<LogInPage settingPermission={setPermission} />}
          />
        )}
        {permission && (
          <Route
            path="/landingPage"
            element={<MyTable settingPermission={setPermission} />}
          />
        )}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
