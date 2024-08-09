import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/asian.png";
import { userLoginApi } from "../../apis/Api";
import toast from "react-hot-toast";
import useDocumentTitle from "../../components/DocTitle";
import { Link } from "react-router-dom";

const LoginPage = () => {
  useDocumentTitle("Member Login - ACSIC Conference");

  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [lockDuration, setLockDuration] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    if (lockDuration > 0) {
      const timer = setInterval(() => {
        setLockDuration((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the timer on unmount
    } else if (lockDuration === 0) {
      setIsLocked(false);
      setLockDuration(null);
    }
  }, [lockDuration]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedPassword = password.trim();
    const data = {
      firstName: firstName,
      password: trimmedPassword,
    };

    userLoginApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Logged in successfully!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/userdashboard");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        let errorMessage = "Internal server error";
        if (err.response && err.response.data) {
          const response = err.response.data;

          // Handle account lock case
          if (response.lockDuration) {
            setIsLocked(true);
            setLockDuration(response.lockDuration);
            errorMessage = `Account is locked. Please try again later. Time remaining: ${response.lockDuration} seconds`;
          } else if (response.remainingAttempts !== undefined) {
            setRemainingAttempts(response.remainingAttempts);
            errorMessage = `Invalid credentials. Remaining attempts: ${response.remainingAttempts}`;
          } else {
            errorMessage = response.error;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img src={Logo} className="h-[150px] mb-6" alt="ACSIC Logo" />

          <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-md xl:p-0">
            <div className="p-8 space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center">
                Log in to your account
              </h1>
              <p className="text-center text-gray-500">
                Please log in with the username and password sent to your
                confirmation email.
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
                    htmlFor="firstName"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    onChange={handleFirstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    placeholder="Enter your username"
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
                    onChange={handlePassword}
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
              <div className="flex justify-center items-center mt-4">
                <Link
                  className="text-green-600 hover:underline"
                  to="/changepassword"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
