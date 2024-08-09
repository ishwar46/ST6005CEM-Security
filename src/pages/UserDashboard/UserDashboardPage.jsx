import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/asian.png";
import Navbar from "../../components/Navbar";
import ToastButton from "../../components/ToastButton";
import useDocumentTitle from "../../components/DocTitle";

const UserDashboardPage = () => {
  useDocumentTitle("User Profile - ACSIC Conference ");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div>Loading...</div>;
  }

  const {
    personalInformation,
    dietaryRequirements = {},
    accompanyingPerson = {},
    profilePicture,
  } = user;

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  if (!personalInformation) {
    return <div>Error: Personal information is missing.</div>;
  }

  return (
    <>
      <Navbar />
      <style>
        {`
          .pattern-bg {
            background: linear-gradient(to right, #09643b, #2e3192), radial-gradient(white 1px, transparent 1px);
            background-size: cover, 20px 20px;
            background-position: center center, center center;
            background-repeat: no-repeat, repeat;
          }
          .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #2e3192;
            color: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }
          .large-avatar {
            width: 160px;
            height: 160px;
            font-size: 4rem;
          }
          .dashboard-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
          .dashboard-card h3 {
            margin-bottom: 10px;
            font-size: 1.5rem;
            color: #2e3192;
          }
          .dashboard-card p, .dashboard-card li {
            color: #555;
          }
          .dashboard-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
            text-align: center;
          }
          .dashboard-header img {
            border-radius: 50%;
            width: 120px;
            height: 120px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .dashboard-header h1 {
            margin-top: 15px;
            font-size: 2rem;
            color: #09643b;
          }
          .dashboard-header p {
            color: #777;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            text-align: center;
            color: white;
            text-decoration: none;
            transition: background 0.3s;
          }
          .btn-green {
            background: #28a745;
          }
          .btn-green:hover {
            background: #218838;
          }
          .btn-blue {
            background: #007bff;
          }
          .btn-blue:hover {
            background: #0056b3;
          }
          .btn-yellow {
            background: #ffc107;
          }
          .btn-yellow:hover {
            background: #e0a800;
          }
        `}
      </style>
      <div className="min-h-screen flex items-center justify-center p-5 pattern-bg">
        <div className="relative bg-gradient-to-r from-white via-gray-100 to-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
          <div className="absolute top-5 right-5">
            <img src={logo} alt="Logo" className="h-20 w-16" />
          </div>
          <div className="dashboard-header">
            {profilePicture?.fileName ? (
              <img
                src={`http://localhost:5000/${profilePicture.fileName}`}
                alt="Profile"
              />
            ) : (
              <div className="avatar large-avatar">
                {getInitials(
                  personalInformation.fullName.firstName,
                  personalInformation.fullName.lastName
                )}
              </div>
            )}
            <h1>
              Welcome, {personalInformation.title}{" "}
              {personalInformation.fullName.firstName}!
            </h1>
            <p>
              {personalInformation.jobPosition} at{" "}
              {personalInformation.nameOfInstitution}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="dashboard-card">
              <h3>Personal Information</h3>
              <p>
                <strong>Full Name:</strong>{" "}
                {`${personalInformation.fullName.firstName} ${personalInformation.fullName.middleName} ${personalInformation.fullName.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {personalInformation.emailAddress}
              </p>
              <p>
                <strong>Phone Number:</strong> {personalInformation.phoneNumber}
              </p>
              <p>
                <strong>Mobile:</strong> {personalInformation.mobileNumber}
              </p>
              <p>
                <strong>Form Status:</strong> {user.adminVerification.status}
              </p>
            </div>

            {Object.values(dietaryRequirements).some(Boolean) && (
              <div className="dashboard-card">
                <h3>Dietary Requirements</h3>
                <ul className="list-disc pl-5">
                  {dietaryRequirements.vegetarian && <li>Vegetarian</li>}
                  {dietaryRequirements.halal && <li>Halal</li>}
                  {dietaryRequirements.nonveg && <li>Non-Vegetarian</li>}
                  {dietaryRequirements.other && (
                    <li>{dietaryRequirements.other}</li>
                  )}
                </ul>
              </div>
            )}

            {accompanyingPerson.hasAccompanyingPerson && (
              <div className="dashboard-card">
                <h3>Accompanying Person</h3>
                <p>
                  <strong>Name:</strong>{" "}
                  {`${accompanyingPerson.accompanyingPersonInformation.fullName.firstName} ${accompanyingPerson.accompanyingPersonInformation.fullName.lastName}`}
                </p>
                <p>
                  <strong>Relationship:</strong>{" "}
                  {
                    accompanyingPerson.accompanyingPersonInformation
                      .relationship
                  }
                </p>
                {accompanyingPerson.accompanyingPersonInformation
                  .pictureUrl && (
                  <img
                    src={`http://localhost:5000/${accompanyingPerson.accompanyingPersonInformation.pictureUrl}`}
                    alt="Accompanying Person"
                    className="rounded-lg shadow-lg mt-4"
                    style={{ maxWidth: "150px" }}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-6">
            <Link
              to="/schedulenew"
              className="btn btn-green mb-2 sm:mb-0 sm:mr-2"
            >
              View Event Details
            </Link>
            <ToastButton
              text="View Speakers"
              toastMessage="We will update this section soon!"
              className="btn btn-blue mb-2 sm:mb-0 sm:mr-2"
              type="error"
            />
            <Link to="/changepassword" className="btn btn-yellow">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardPage;
