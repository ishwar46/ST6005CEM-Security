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
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLoginApi({ email, password });
      const res = response.data;
      if (res.success) {
        toast.success(res.message);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.admin));
        navigate("/admindashboard");
      } else {
        toast.error(res.error);
        setRemainingAttempts(res.lockDuration ? 0 : res.remainingAttempts);
        setLockDuration(res.lockDuration);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Internal server error";
      toast.error(errorMessage);
      if (err.response?.data) {
        setRemainingAttempts(
          err.response.data.lockDuration
            ? 0
            : err.response.data.remainingAttempts
        );
        setLockDuration(err.response.data.lockDuration);
      }
    }
  };

  useEffect(() => {
    let timer = null;
    if (lockDuration > 0) {
      timer = setInterval(() => {
        setLockDuration((prevDuration) => prevDuration - 1);
      }, 1000);
    } else if (lockDuration === 0) {
      clearInterval(timer);
      setLockDuration(null);
    }
    return () => clearInterval(timer);
  }, [lockDuration]);

  return (
    <>
      <section className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center">
            <img src={Logo} className="h-32 w-32" alt="ASIAN Logo" />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-10 space-y-6">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input
                id="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                id="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {remainingAttempts !== null && (
                <p className="text-red-500 text-center">
                  Attempts remaining: {remainingAttempts}
                </p>
              )}
              {lockDuration !== null && (
                <p className="text-red-500 text-center">
                  Locked for {lockDuration} seconds
                </p>
              )}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
