import React, { useState, useEffect } from "react";
import Logo from "../../assets/asian.png";
import { adminLoginApi } from "../../apis/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../components/DocTitle";

const AdminLogin = () => {
  useDocumentTitle("Admin Login - ACSIC Conference ");

  useEffect(() => {
    const logoutSuccessMessage = localStorage.getItem("logoutSuccessMessage");
    if (logoutSuccessMessage) {
      toast.success(logoutSuccessMessage, {
        duration: 3000,
        position: "top-right",
      });
      localStorage.removeItem("logoutSuccessMessage");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();
  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    const data = {
      email: email,
      password: password,
    };
    //  send data to backend
    adminLoginApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // save token and user data in local storage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.admin));
          // Check if user is admin and navigate to admin dashboard
          if (res.data.admin.isAdmin) {
            navigator("/admindashboard");
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = "Internal server error";
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
      });
  };

  return (
    <>
      {/* <Toaster position="top-center" /> */}
      <section class="bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img src={Logo} className="h-[200px]" alt="ACSIC Logo" />

          <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Admin Log in
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Enter your email
                  </label>
                  <input
                    onChange={handelEmail}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-lg font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    onChange={handelPassword}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  class="w-full text-white bg-green-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
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
