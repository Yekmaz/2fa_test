import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Setup2FA from "./components/Setup2FA";
import Dashboard from "./components/Dashboard";

import GlobalStyles from "./styles/GlobalStyles";
import TwoFAInputForm from "./components/TwoFAInputForm";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="2fa-check" element={<TwoFAInputForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="setup2fa" element={<Setup2FA />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
