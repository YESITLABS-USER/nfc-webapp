import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import ContactFaq from "./pages/Contact&Faq";
import MyPage from "./pages/MyPage";
import TermCondn from "./pages/Term&Condn";
import AboutService from "./pages/AboutService";
import MyProfile from "./pages/MyProfile";
import Loyality from "./pages/Loyality";
import AboutScreen from "./pages/AboutScreen";

const AppRoutes = () => {
  return (
    <Routes >
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contactFaq" element={<ContactFaq />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/terms-condition" element={<TermCondn />} />
      <Route path="/privacy-policy" element={<TermCondn />} />
      <Route path="/aboutService" element={<AboutService />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/loyality" element={<Loyality />} />
      <Route path="/about-tagis" element={<AboutScreen />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
