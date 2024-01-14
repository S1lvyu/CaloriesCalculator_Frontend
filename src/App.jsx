import React from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Calculator from "./components/Calculator/Calculator";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import Homepage from "./components/Homepage/Homepage";
import Diary from "./components/Diary/Diary";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Calculator />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/homepage" element={<Homepage />}>
            <Route index element={<Calculator />} />
            <Route path="diary" element={<Diary />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
