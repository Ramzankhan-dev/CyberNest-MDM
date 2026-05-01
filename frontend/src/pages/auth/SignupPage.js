import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

import {
  Shield,
  User,
  Mail,
  Lock,
  Building2,
  Eye,
  EyeOff
} from "lucide-react";

import {
  registerUser
} from "../../api/authApi";

import "../../styles/auth.css";

function SignupPage() {

  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);

  const [otpMode,
    setOtpMode] =
    useState(false);

  const [otp,
    setOtp] =
    useState([
      "",
      "",
      "",
      "",
      "",
      ""
    ]);

  const [toastMessage,
    setToastMessage] =
    useState("");

  const [formData,
    setFormData] =
    useState({
      owner_name: "",
      organization_name: "",
      email: "",
      password: "",
      confirm_password: ""
    });

  const showToast =
    (message) => {

    setToastMessage(
      message
    );

    setTimeout(() => {

      setToastMessage(
        ""
      );

    }, 2500);

  };

  const handleChange =
    (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const sendOtp =
    async (e) => {

    e.preventDefault();

    if (
      !formData.owner_name ||
      !formData.organization_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {

      showToast(
        "Please fill all fields"
      );

      return;

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.email
      )
    ) {

      showToast(
        "Enter valid email"
      );

      return;

    }

    if (
      formData.password.length < 8
    ) {

      showToast(
        "Password must be at least 8 characters"
      );

      return;

    }

    if (
      formData.password !==
      formData.confirm_password
    ) {

      showToast(
        "Passwords do not match"
      );

      return;

    }

    const generatedOtp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    localStorage.setItem(
      "cybernest_otp",
      generatedOtp
    );

    localStorage.setItem(
      "signup_data",
      JSON.stringify(
        formData
      )
    );

    try {

      await emailjs.send(
        "service_elhn2r7",
        "template_hwx5t4m",
        {
          to_name:
            formData.owner_name,

          user_email:
            formData.email,

          otp:
            generatedOtp
        },
        "i3Xb8fWFZeV06SC3i"
      );

      setOtpMode(
        true
      );

      showToast(
        "OTP sent successfully"
      );

    } catch {

      showToast(
        "OTP sending failed"
      );

    }

  };

  const handleOtpChange =
    (value, index) => {

    const updatedOtp =
      [...otp];

    updatedOtp[index] =
      value;

    setOtp(
      updatedOtp
    );

    if (
      value &&
      index < 5
    ) {

      document
        .getElementById(
          `otp-${index + 1}`
        )
        ?.focus();

    }

  };

  const verifyOtp =
    async () => {

    const enteredOtp =
      otp.join("");

    const savedOtp =
      localStorage.getItem(
        "cybernest_otp"
      );

    if (
      enteredOtp !==
      savedOtp
    ) {

      showToast(
        "Invalid OTP"
      );

      return;

    }

    try {

      const userData =
        JSON.parse(
          localStorage.getItem(
            "signup_data"
          )
        );

      await registerUser(
        userData
      );

      showToast(
        "Account created successfully"
      );

      setTimeout(() => {

        navigate(
          "/"
        );

      }, 1800);

    } catch {

      showToast(
        "Registration failed"
      );

    }

  };

  return (
    <div className="auth-page">

      {

        toastMessage && (

          <div className="toast-box">

            {
              toastMessage
            }

          </div>

        )

      }

      <div className="auth-card">

        <div className="logo-box">

          <Shield
            size={28}
          />

        </div>

        <h2>

          Create Account

        </h2>

        <form
          onSubmit={
            sendOtp
          }
        >

          <div className="input-group">

            <User size={16} />

            <input
              name="owner_name"
              placeholder="Owner Name"
              onChange={
                handleChange
              }
            />

          </div>

          <div className="input-group">

            <Building2 size={16} />

            <input
              name="organization_name"
              placeholder="Organization"
              onChange={
                handleChange
              }
            />

          </div>

          <div className="input-group">

            <Mail size={16} />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={
                handleChange
              }
            />

          </div>

          <div className="input-group">

            <Lock size={16} />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              onChange={
                handleChange
              }
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {

                showPassword
                ? <EyeOff size={16} />
                : <Eye size={16} />

              }

            </span>

          </div>

          <div className="input-group">

            <Lock size={16} />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={
                handleChange
              }
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >

              {

                showConfirmPassword
                ? <EyeOff size={16} />
                : <Eye size={16} />

              }

            </span>

          </div>

          {

            !otpMode && (

              <button
                type="submit"
              >

                Send OTP

              </button>

            )

          }

        </form>

        {

          otpMode && (

            <>

              <div className="otp-wrapper">

                {

                  otp.map(
                    (
                      digit,
                      index
                    ) => (

                      <input
                        key={index}
                        id={`otp-${index}`}
                        className="otp-box"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleOtpChange(
                            e.target.value,
                            index
                          )
                        }
                      />

                    )
                  )

                }

              </div>

              <button
                onClick={
                  verifyOtp
                }
              >

                Verify OTP

              </button>

            </>

          )

        }

        <p
          onClick={() =>
            navigate("/")
          }
        >

          Already have account?

        </p>

      </div>

    </div>
  );
}

export default SignupPage;