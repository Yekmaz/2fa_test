import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Setup2FA from "./Setup2FA";
import Dashboard from "./assets/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="setup2fa" element={<Setup2FA />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
