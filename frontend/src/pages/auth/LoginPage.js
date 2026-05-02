import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Enter valid email");
      return;
    }

    if (formData.password.length < 8) {
      showToast("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(formData);
      
      // Extract token and admin data from response
      const token = response.data.token;
      const adminData = response.data.admin || response.data.user;
      
      // Store using AuthContext's login function
      login(token, adminData);
      
      showToast("Login successful");
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      showToast(error.response?.data?.message || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {toastMessage && (
        <div className="toast-box">
          {toastMessage}
        </div>
      )}

      <div className="auth-card">
        <div className="logo-box">
          <Shield size={28} />
        </div>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <Mail size={16} />
            <input
              type="email"
              name="email"
              placeholder="Email"
 value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <Lock size={16} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
 value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p onClick={() => navigate("/signup")}>
          Create account?
        </p>
      </div>
    </div>
  );
}

export default LoginPage;