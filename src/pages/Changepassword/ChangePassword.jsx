import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { changePasswordApi } from "../../apis/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import zxcvbn from "zxcvbn";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ChangePassword = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleNewPassword = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    const result = zxcvbn(password);
    setPasswordStrength(result.score);
    setPasswordFeedback(result.feedback.suggestions.join(" "));
  };

  const handleConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setPasswordMatch(confirmPassword === newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      firstName,
      email,
      password: password.trim(),
      newPassword: newPassword.trim(),
      confirmPassword: confirmPassword.trim(),
    };

    changePasswordApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success("Password Changed Successfully");
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        let errorMessage = "Internal server error";
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
      });
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 0:
        return { label: "Very Weak", color: "bg-red-500" };
      case 1:
        return { label: "Weak", color: "bg-orange-500" };
      case 2:
        return { label: "Fair", color: "bg-yellow-500" };
      case 3:
        return { label: "Good", color: "bg-blue-500" };
      case 4:
        return { label: "Strong", color: "bg-green-500" };
      default:
        return { label: "Very Weak", color: "bg-red-500" };
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Change Password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Enter your username
                  </label>
                  <input
                    onChange={handleFirstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Username"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Enter your email
                  </label>
                  <input
                    onChange={handleEmail}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Old Password
                  </label>
                  <input
                    onChange={handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleNewPassword}
                      type={newPasswordVisible ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-700" />
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="flex-1 h-2 rounded-full overflow-hidden bg-gray-300">
                        <div
                          className={`h-full ${
                            getPasswordStrengthLabel().color
                          }`}
                          style={{ width: `${(passwordStrength + 1) * 20}%` }}
                        ></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-800">
                        {getPasswordStrengthLabel().label}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                      {passwordFeedback ||
                        "Use 8-12 characters, including uppercase, digits, and symbols."}
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleConfirmPassword}
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                        !passwordMatch ? "border-red-500" : ""
                      }`}
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-700" />
                      )}
                    </div>
                  </div>
                  {!passwordMatch && (
                    <p className="text-sm text-red-600">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-green-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
