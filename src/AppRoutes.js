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
import NewScan from "./pages/NewScan";
import ProfileById from "./pages/ProfileById";
import NFCTag from "./pages/NFCTag";
import InvalidScan from "./pages/InvalidScan";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes >
      <Route path="/" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> */}
      <Route path="/dashboard/:lang/:id" element={<NewScan />} />
      <Route path="/tag/:xuid" element={<NFCTag />} />
      <Route path="/invalid-scan" element={<InvalidScan />} />
      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contactFaq" element={<ContactFaq />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/terms-condition" element={<TermCondn />} />
      <Route path="/privacy-policy" element={<TermCondn />} />
      <Route path="/aboutService" element={<AboutService />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/userprofile/:id" element={<ProfileById />} />
      <Route path="/loyality" element={<Loyality />} />
      <Route path="/about-tagis" element={<AboutScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
