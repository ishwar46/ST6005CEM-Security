import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CeoMessage from "./pages/CEOMessage/CeoMessage";
import HomePage from "./pages/MainHome/HomePage";
import Accomodation from "./pages/Accomodation/Accomodation";
import Speakers from "./components/Spakers";
import Schedule from "./pages/Schedule/Schedule";
import GallerySection from "./pages/Gallery/GalleyPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivcyPolicyPage";
import AcsicMembers from "./pages/Members/Members";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./components/NotFound";
import History from "./pages/History/History";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminLogin from "./pages/LoginPage/AdminLogin";
import AdminRoutes from "./PrivateRoutes/AdminRoutes";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import BiographyGuidelines from "./pages/BiographyGuides/BiographyGuideLines";
import Registrations from "./pages/Registration/Registrations";
import ScrollToTop from "./ScrollToTop";
import UserRoutes from "./PrivateRoutes/UserRoutes";
import UserDashboardPage from "./pages/UserDashboard/UserDashboardPage";
import EditUser from "./pages/adminDashboard/EditUser.jsx";
import ChangePassword from "./pages/Changepassword/ChangePassword.jsx";
import ParticipantAttendance from "./pages/adminDashboard/Attendance.jsx";
import UnderMaintenance from "./pages/UnderMaintainance/UnderMaintainance.jsx";
import AboutASIAN from "./pages/AboutASIAN/Aboutsummit.jsx";

function App() {
  return (
    <Router>
      <Toaster position="bottom-left" reverseOrder={false} /> <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />{" "}
        <Route path="/homepage" element={<HomePage />} />{" "}
        <Route path="/ceomessage" element={<CeoMessage />} />{" "}
        <Route path="/accomodation" element={<Accomodation />} />{" "}
        <Route path="/speakers" element={<Speakers />} />{" "}
        <Route path="/schedulenew" element={<Schedule />} />{" "}
        <Route path="/gallery" element={<GallerySection />} />{" "}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />{" "}
        <Route path="/memebersacsic" element={<AcsicMembers />} />{" "}
        <Route path="/aboutsummit" element={<AboutASIAN />} />{" "}
        <Route path="/history" element={<History />} />{" "}
        <Route path="/register" element={<Registrations />} />{" "}
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/changepassword" element={<ChangePassword />} /> {""}{" "}
        <Route path="/maintenance" element={<UnderMaintenance />} /> {""}{" "}
        <Route
          path="/biography-instructions"
          element={<BiographyGuidelines />}
        />{" "}
        <Route path="/admin" element={<AdminLogin />} />{" "}
        {/* Admin Protected Routes */}{" "}
        <Route element={<AdminRoutes />}>
          <Route path="/admindashboard" element={<AdminDashboard />} />{" "}
        </Route>{" "}
        <Route element={<AdminRoutes />}>
          <Route path="/edituser/:userId" element={<EditUser />} />{" "}
        </Route>{" "}
        <Route element={<AdminRoutes />}>
          <Route path="/attendance" element={<ParticipantAttendance />} />{" "}
        </Route>{" "}
        {/* User Protected Route */}{" "}
        <Route element={<UserRoutes />}>
          <Route path="/userdashboard" element={<UserDashboardPage />} />{" "}
        </Route>{" "}
        {/* Catch-all for 404 Not Found */}{" "}
        <Route path="*" element={<NotFoundPage />} />{" "}
      </Routes>{" "}
    </Router>
  );
}

export default App;
