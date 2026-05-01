import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock } from "lucide-react";

import "../../styles/auth.css";
import { loginUser } from "../../api/authApi";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await loginUser(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="logo-box">
          <Shield size={28} />
        </div>

        <h2>CyberNest Login</h2>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <Mail size={16} />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <Lock size={16} />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />

          </div>

          <button type="submit">

            {
              loading
              ? "Please Wait..."
              : "Login"
            }

          </button>

        </form>

        <p onClick={() => navigate("/signup")}>

          Create Account

        </p>

      </div>

    </div>
  );
}

export default LoginPage;