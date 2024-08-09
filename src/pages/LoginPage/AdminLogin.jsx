import React, { useState, useEffect } from "react";
import Logo from "../../assets/asian.png";
import { adminLoginApi } from "../../apis/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../components/DocTitle";

const AdminLogin = () => {
  useDocumentTitle("Admin Login - ASIAN Conference");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lockDuration, setLockDuration] = useState(null);
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLoginApi({ email, password });
      const res = response.data;
      if (res.success) {
        toast.success("Logged in successfully!");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.admin));
        navigate("/admindashboard");
      } else {
        toast.error(res.error || "Login failed");
        if (res.lockDuration) {
          setIsLocked(true);
          setLockDuration(res.lockDuration);
        } else if (res.remainingAttempts !== undefined) {
          setRemainingAttempts(res.remainingAttempts);
        }
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Internal server error";
      toast.error(errorMessage);
      if (err.response?.data) {
        if (err.response.data.lockDuration) {
          setIsLocked(true);
          setLockDuration(err.response.data.lockDuration);
        } else {
          setRemainingAttempts(err.response.data.remainingAttempts);
        }
      }
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (lockDuration > 0) {
      const timer = setInterval(() => {
        setLockDuration((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (lockDuration === 0) {
      setIsLocked(false);
      setLockDuration(null);
    }
  }, [lockDuration]);

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img src={Logo} className="h-[150px] mb-6" alt="ASIAN Logo" />

          <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
            <div className="p-8 space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
                Admin Login
              </h1>
              <p className="text-center text-gray-500">
                Please log in with your admin email and password.
              </p>
              {isLocked && (
                <div className="text-center text-red-600 font-semibold">
                  Your account is locked. Please try again in{" "}
                  {Math.ceil(lockDuration / 60)} minutes and {lockDuration % 60}{" "}
                  seconds.
                </div>
              )}
              {remainingAttempts !== null && !isLocked && (
                <div className="text-center text-yellow-600 font-semibold">
                  {remainingAttempts} attempt
                  {remainingAttempts !== 1 ? "s" : ""} remaining.
                </div>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    onChange={handleEmailChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={handlePasswordChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={isLocked}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
