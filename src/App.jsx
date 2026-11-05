import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/AppLayout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import SignupPage from "./pages/SignupPage";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import MainPage from "./pages/MainPage";

// color pallete:
// darker blue: rgb(10, 38, 71)
// dark blue: rgb(20, 66, 114)
// regular blue: rgb(32, 82, 149)
// light blue: rgb(44, 116, 179)

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Public pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/reset/:token" element={<NewPassword />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<MainPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
