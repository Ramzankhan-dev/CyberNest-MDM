import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  registerUser
} from "../../api/authApi";

import "../../styles/auth.css";

function VerifyOtpPage() {

  const navigate =
    useNavigate();

  const [otp, setOtp] =
    useState("");

  const verifyOtp =
    async () => {

    const savedOtp =
      localStorage.getItem(
        "cybernest_otp"
      );

    const otpTime =
      localStorage.getItem(
        "otp_time"
      );

    const now =
      Date.now();

    if (
      now - otpTime >
      300000
    ) {

      alert(
        "OTP expired"
      );

      return;

    }

    if (
      otp !== savedOtp
    ) {

      alert(
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

      alert(
        "Account Created"
      );

      navigate("/");

    } catch (error) {

      alert(
        "Registration failed"
      );

    }

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>
          Verify OTP
        </h2>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={
            (e) =>
              setOtp(
                e.target.value
              )
          }
        />

        <button
          onClick={
            verifyOtp
          }
        >

          Verify OTP

        </button>

      </div>

    </div>
  );
}

export default VerifyOtpPage;