// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// import LoginPage from "./pages/auth/LoginPage";
// import SignupPage from "./pages/auth/SignupPage";
// import VerifyOtpPage from "./pages/auth/VerifyOtpPage";


// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<LoginPage />} />
// //         <Route path="/signup" element={<SignupPage />} />
// //         <Route path="/verify-otp" element={<VerifyOtpPage />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute   from "./routes/ProtectedRoute";
// import DashboardPage    from "./pages/dashboard/DashboardPage";

// // Auth pages — Vareesha will fill these in
// // import LoginPage    from "./pages/auth/LoginPage";
// // import RegisterPage from "./pages/auth/RegisterPage";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/verify-otp" element={<VerifyOtpPage />} />

//           {/* Dashboard — protected */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* Default redirect */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context & Routes
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          
          {/* Root path: Agar user logged in nahi hai toh login par bhej dega */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected Route: Sirf login users ke liye */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Redirect: Agar koi ghalat URL likhe toh dashboard par redirect kare */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}