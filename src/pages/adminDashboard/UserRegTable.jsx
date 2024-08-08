import React, { useEffect, useState, useRef } from "react";
import excelIcon from "../../assets/images/sheet.png";
import * as XLSX from "xlsx";
import "../../css/styles.css";
import "../../css/print.css";
import {
  deleteUserApi,
  getAllUsersApi,
  verifyUserByAdminApi,
} from "../../apis/Api";
import { useReactToPrint } from "react-to-print";
import acsisclogo from "../../assets/asian.png";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";

const createWordDocument = (text) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(text)],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "biography.docx");
  });
};

const ImagePreviewModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-full max-h-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Close image preview"
        >
          <i className="fas fa-times"></i>
        </button>
        <img src={imageUrl} alt="Preview" className="max-w-full max-h-full" />
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, onApprove, onDelete, children, status }) => {
  const componentRef = useRef();
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div
          className="bg-white p-5 rounded-lg shadow-lg w-full max-w-3xl mx-4 overflow-y-auto modal-content"
          style={{ maxHeight: "80vh" }}
        >
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Participants Details
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700"
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="space-y-4 printable-content" ref={componentRef}>
            {children}
          </div>
          <div className="mt-6 flex justify-end space-x-4 no-print">
            <button
              onClick={onApprove}
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center ${
                status === "accepted" ? "cursor-not-allowed opacity-50" : ""
              }`}
              aria-label="Approve user"
              disabled={status === "accepted"}
            >
              <i className="fas fa-check-circle mr-2"></i>
              Accept
            </button>
            <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              aria-label="Print details"
            >
              <i className="fas fa-print mr-2"></i>
              Print
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              aria-label="Close modal"
            >
              <i className="fas fa-times mr-2"></i>
              Close
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              aria-label="Delete user"
            >
              <i className="fas fa-trash mr-2"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
      <ImagePreviewModal
        isOpen={isImagePreviewOpen}
        onClose={() => setIsImagePreviewOpen(false)}
      />
    </>
  );
};

const getUserDetailsForQR = (currentUser) => {
  if (
    !currentUser ||
    Object.keys(currentUser).length === 0 ||
    !currentUser.personalInformation
  ) {
    return "No valid user data available";
  }
  const details = `Title: ${
    currentUser.personalInformation.title || "N/A"
  }\nFull Name: ${
    currentUser.personalInformation.fullName.firstName || "N/A"
  } ${currentUser.personalInformation.fullName.middleName || ""} ${
    currentUser.personalInformation.fullName.lastName || "N/A"
  }\nNationality: ${
    currentUser.personalInformation.nationality || "N/A"
  }\nInstitution: ${
    currentUser.personalInformation.nameOfInstitution || "N/A"
  }\nJob Position: ${
    currentUser.personalInformation.jobPosition || "N/A"
  }\nOffice Address: ${
    currentUser.personalInformation.officeAddress || "N/A"
  }\nEmail Address: ${
    currentUser.personalInformation.emailAddress || "N/A"
  }\nPhone Number: ${
    currentUser.personalInformation.phoneNumber || "N/A"
  }\nMobile Number: ${currentUser.personalInformation.mobileNumber || "N/A"}`;
  return details;
};

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [duplicateUserIds, setDuplicateUserIds] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [institutionFilter, setInstitutionFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [imageToPreview, setImageToPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const biography = currentUser?.biography || "";
  const truncatedBiography = truncateText(biography, 50);

  const handleImageClick = (imageUrl) => {
    setImageToPreview(imageUrl);
    setIsImagePreviewOpen(true);
  };

  //Edit User
  const handleEditUser = (userId) => {
    navigate(`/edituser/${userId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersApi();
        if (response && response.data && response.data.users) {
          setUsers(response.data.users);
          setDuplicateUserIds(response.data.duplicateUserIds);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  const handleViewDetails = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUserApi(userId);
      if (response && response.data) {
        toast.success("User deleted successfully!");
        setUsers(users.filter((user) => user._id !== userId));
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error(`Error deleting user: ${error.message}`);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      users.map((user) => ({
        "First Name": user.personalInformation?.fullName?.firstName || "N/A",
        "Last Name": user.personalInformation?.fullName?.lastName || "N/A",
        Email: user.personalInformation?.emailAddress || "N/A",
        Institution: user.personalInformation?.nameOfInstitution || "N/A",
        "Office Address": user.personalInformation?.officeAddress || "N/A",
        "Phone Number": user.personalInformation?.phoneNumber || "N/A",
        Status: user.adminVerification?.status || "N/A",
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    XLSX.writeFile(wb, "acsic_participant_details.xlsx");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleApprove = async () => {
    try {
      const response = await verifyUserByAdminApi(currentUser._id, {
        status: "accepted",
      });
      if (response && response.data) {
        toast.success("User approved successfully!");
        setUsers(
          users.map((user) =>
            user._id === currentUser._id
              ? { ...user, adminVerification: { status: "accepted" } }
              : user
          )
        );
        setIsModalOpen(false);
      } else {
        toast.error("Failed to approve user.");
      }
    } catch (error) {
      toast.error(`Error approving user: ${error.message}`);
    }
  };

  const filteredUsers =
    users &&
    users.filter(
      (user) =>
        (user.personalInformation?.fullName?.firstName
          ?.toLowerCase()
          .includes(nameFilter.toLowerCase()) ||
          user.personalInformation?.fullName?.lastName
            ?.toLowerCase()
            .includes(nameFilter.toLowerCase())) &&
        user.personalInformation?.emailAddress
          ?.toLowerCase()
          .includes(emailFilter.toLowerCase()) &&
        user.personalInformation?.nameOfInstitution
          ?.toLowerCase()
          .includes(institutionFilter.toLowerCase())
    );

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const dietaryRequirements = currentUser?.dietaryRequirements;
  const showOther =
    !dietaryRequirements?.vegetarian &&
    !dietaryRequirements?.halal &&
    !dietaryRequirements?.nonveg &&
    dietaryRequirements?.other;

  return (
    <>
      <div className="mt-5">
        {users.length > 0 ? (
          <div className="border rounded-xl p-5 bg-transparent shadow-md">
            <div className="text-xl text-gray-800 mb-3 font-bold">
              Registered Participant
            </div>
            <div className="mb-5 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="p-2 border rounded flex-grow mr-4 text-black mb-2 sm:mb-0"
                />
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  className="p-2 border rounded flex-grow mr-4 text-black mb-2 sm:mb-0"
                />
                <input
                  type="text"
                  placeholder="Search by institution..."
                  value={institutionFilter}
                  onChange={(e) => setInstitutionFilter(e.target.value)}
                  className="p-2 border rounded flex-grow mr-4 text-black"
                />
              </div>
              <button
                onClick={exportToExcel}
                className="p-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded flex items-center mt-4 sm:mt-0"
              >
                <img
                  src={excelIcon}
                  alt="Export to Excel"
                  className="w-6 h-6 mr-2"
                />
                Export
              </button>
            </div>

            <table className="min-w-full leading-normal bg-transparent shadow-md">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SN
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={
                      duplicateUserIds && duplicateUserIds.includes(user._id)
                        ? "bg-yellow-100"
                        : ""
                    }
                  >
                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                      {user.personalInformation?.fullName?.firstName || "N/A"}{" "}
                      {user.personalInformation?.fullName?.lastName || "N/A"}{" "}
                      {user.chiefDelegateOrSpeaker?.chiefDelegate && (
                        <span title="Chief Delegate">⭐</span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                      {user.personalInformation?.emailAddress || "N/A"}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                      {user.personalInformation?.nameOfInstitution || "N/A"}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          user.adminVerification?.status || "N/A"
                        )}`}
                      >
                        {user.adminVerification?.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600 flex items-center justify-start space-x-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => handleEditUser(user._id)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentUser(user);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Stack spacing={2} className="mt-4">
              <Pagination
                count={Math.ceil(filteredUsers.length / usersPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          </div>
        ) : (
          <div className="text-gray-800">No users available.</div>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApprove={handleApprove}
          onDelete={() => handleDeleteUser(currentUser._id)}
          status={currentUser?.adminVerification?.status}
          handleImageClick={handleImageClick}
        >
          <div className="text-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-green-800">
                ASIAN Microfinance Summit 2024 (Participant Details)
              </h2>
              <img src={acsisclogo} alt="Logo" className="w-12 h-15" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {/* Personal Information */}
              <div className="col-span-2 border border-gray-500 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Personal Information
                </h3>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>Title:</strong>{" "}
                      {currentUser?.personalInformation?.title || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Full Name:</strong>{" "}
                      {`${
                        currentUser?.personalInformation?.fullName?.firstName ||
                        "N/A"
                      } ${
                        currentUser?.personalInformation?.fullName
                          ?.middleName || ""
                      } ${
                        currentUser?.personalInformation?.fullName?.lastName ||
                        "N/A"
                      }`}
                    </p>
                    <p className="text-sm">
                      <strong>Nationality:</strong>{" "}
                      {currentUser?.personalInformation?.nationality || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Institution:</strong>{" "}
                      {currentUser?.personalInformation?.nameOfInstitution ||
                        "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Job Position:</strong>{" "}
                      {currentUser?.personalInformation?.jobPosition || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Office Address:</strong>{" "}
                      {currentUser?.personalInformation?.officeAddress || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Email Address:</strong>{" "}
                      {currentUser?.personalInformation?.emailAddress || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Phone Number:</strong>{" "}
                      {currentUser?.personalInformation?.phoneNumber || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Mobile Number:</strong>{" "}
                      {currentUser?.personalInformation?.mobileNumber || "N/A"}
                    </p>
                    {(dietaryRequirements?.vegetarian ||
                      dietaryRequirements?.halal ||
                      dietaryRequirements?.nonveg ||
                      showOther) && (
                      <p className="text-sm">
                        <strong>Dietary Preferences:</strong>{" "}
                        {[
                          dietaryRequirements?.vegetarian && "Vegetarian",
                          dietaryRequirements?.halal && "Halal",
                          dietaryRequirements?.nonveg && "Non-Veg",
                          showOther && dietaryRequirements?.other,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    {currentUser?.profilePicture?.fileName && (
                      <img
                        src={`http://localhost:5000/${currentUser.profilePicture.fileName}`}
                        alt="Profile"
                        className="w-20 h-20 rounded-full cursor-pointer"
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:5000/${currentUser.profilePicture.fileName}`
                          )
                        }
                      />
                    )}
                    {currentUser && currentUser.personalInformation && (
                      <div className="mt-4">
                        <QRCodeSVG
                          fgColor="green"
                          value={getUserDetailsForQR(currentUser)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Sim Card Requirements */}
              {currentUser?.mobileSimCardRequirements?.takeSim &&
                currentUser?.mobileSimCardRequirements?.simType && (
                  <div className="col-span-1 text-sm border border-gray-500 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">
                      Sim Card Requirements
                    </h3>
                    <p>
                      <strong>Sim Type:</strong>{" "}
                      {currentUser.mobileSimCardRequirements.simType}
                    </p>
                  </div>
                )}

              {/* Chief Delegate or Speaker */}
              {(currentUser?.chiefDelegateOrSpeaker?.chiefDelegate ||
                currentUser?.chiefDelegateOrSpeaker?.participant) && (
                <div className="col-span-1 text-sm border border-gray-500 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    Chief Delegate or Participant
                  </h3>
                  {currentUser?.chiefDelegateOrSpeaker?.chiefDelegate && (
                    <p>Chief Delegate</p>
                  )}
                  {currentUser?.chiefDelegateOrSpeaker?.participant && (
                    <p>
                      <strong>Participant</strong>
                    </p>
                  )}
                </div>
              )}

              {/* Biography */}
              {biography && (
                <div className="col-span-2 text-sm border border-gray-500 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    Biography
                  </h3>
                  {biography.split(" ").length > 50 ? (
                    <>
                      <p className="no-print">{truncatedBiography}</p>
                      <p className="print-only">
                        Biography needs to be downloaded separately. Please
                        download from the details section.
                      </p>
                      <button
                        onClick={() => createWordDocument(biography)}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline no-print"
                      >
                        Download Biography
                      </button>
                    </>
                  ) : (
                    <p>{biography}</p>
                  )}
                </div>
              )}

              {/* Accompanying Person Information */}
              {currentUser?.accompanyingPerson?.hasAccompanyingPerson && (
                <div className="col-span-2 text-sm border border-gray-500 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    Accompanying Person
                  </h3>
                  <div className="flex items-center">
                    <div className="flex-1">
                      {currentUser?.accompanyingPerson
                        ?.accompanyingPersonInformation?.title && (
                        <p>
                          <strong>Title:</strong>{" "}
                          {
                            currentUser.accompanyingPerson
                              .accompanyingPersonInformation.title
                          }
                        </p>
                      )}
                      {(currentUser?.accompanyingPerson
                        ?.accompanyingPersonInformation?.fullName?.firstName ||
                        currentUser?.accompanyingPerson
                          ?.accompanyingPersonInformation?.fullName
                          ?.middleName ||
                        currentUser?.accompanyingPerson
                          ?.accompanyingPersonInformation?.fullName
                          ?.lastName) && (
                        <p>
                          <strong>Full Name:</strong>{" "}
                          {`${
                            currentUser?.accompanyingPerson
                              ?.accompanyingPersonInformation?.fullName
                              ?.firstName || ""
                          } ${
                            currentUser?.accompanyingPerson
                              ?.accompanyingPersonInformation?.fullName
                              ?.middleName || ""
                          } ${
                            currentUser?.accompanyingPerson
                              ?.accompanyingPersonInformation?.fullName
                              ?.lastName || ""
                          }`}
                        </p>
                      )}
                      {currentUser?.accompanyingPerson
                        ?.accompanyingPersonInformation?.relationship && (
                        <p>
                          <strong>Relationship:</strong>{" "}
                          {
                            currentUser.accompanyingPerson
                              .accompanyingPersonInformation.relationship
                          }
                        </p>
                      )}
                      {(currentUser?.accompanyingPerson
                        ?.accompanyingPersonInformation?.dietaryRequirements
                        ?.vegetarian ||
                        currentUser?.accompanyingPerson
                          ?.accompanyingPersonInformation?.dietaryRequirements
                          ?.halal ||
                        currentUser?.accompanyingPerson
                          ?.accompanyingPersonInformation?.dietaryRequirements
                          ?.nonveg ||
                        currentUser?.accompanyingPerson
                          ?.accompanyingPersonInformation?.dietaryRequirements
                          ?.other) && (
                        <p>
                          <strong>Dietary Requirements:</strong>
                          {currentUser.accompanyingPerson
                            .accompanyingPersonInformation.dietaryRequirements
                            .vegetarian && " Vegetarian"}
                          {currentUser.accompanyingPerson
                            .accompanyingPersonInformation.dietaryRequirements
                            .halal && " Halal"}
                          {currentUser.accompanyingPerson
                            .accompanyingPersonInformation.dietaryRequirements
                            .nonveg && " Non-Veg"}
                          {currentUser.accompanyingPerson
                            .accompanyingPersonInformation.dietaryRequirements
                            .other &&
                            currentUser.accompanyingPerson
                              .accompanyingPersonInformation.dietaryRequirements
                              .other !== "" &&
                            ` ${currentUser.accompanyingPerson.accompanyingPersonInformation.dietaryRequirements.other}`}
                        </p>
                      )}
                    </div>
                    {currentUser?.accompanyingPerson
                      ?.accompanyingPersonInformation?.pictureUrl && (
                      <div className="ml-4">
                        <img
                          src={`http://localhost:5000/${currentUser.accompanyingPerson.accompanyingPersonInformation.pictureUrl}`}
                          alt="Accompanying Person"
                          className="w-20 h-20 rounded-full cursor-pointer"
                          onClick={() =>
                            handleImageClick(
                              `http://localhost:5000/${currentUser.accompanyingPerson.accompanyingPersonInformation.pictureUrl}`
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Admin Verification */}
              <div className="col-span-2 text-sm border border-gray-500 p-4 rounded-lg no-print">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Admin Verification
                </h3>
                <div className="flex flex-col">
                  <div className="flex">
                    <strong className="w-48">Status:</strong>
                    <span className="font-bold">
                      {currentUser?.adminVerification?.status || "N/A"}
                    </span>
                  </div>
                  {currentUser?.adminVerification?.adminRemarks && (
                    <div className="flex">
                      <strong className="w-48">Admin Remarks:</strong>
                      <span>{currentUser.adminVerification.adminRemarks}</span>
                    </div>
                  )}

                  <div className="flex">
                    <strong className="w-48">Verified Date:</strong>
                    <span>
                      {currentUser?.adminVerification?.verifiedDate
                        ? new Date(
                            currentUser.adminVerification.verifiedDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex">
                    <strong className="w-48">Verification Request Date:</strong>
                    <span>
                      {currentUser?.adminVerification?.verificationRequestDate
                        ? new Date(
                            currentUser.adminVerification.verificationRequestDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          user={currentUser}
          onConfirm={() => handleDeleteUser(currentUser._id)}
        />

        <ImagePreviewModal
          isOpen={isImagePreviewOpen}
          onClose={() => setIsImagePreviewOpen(false)}
          imageUrl={imageToPreview}
        />
      </div>
    </>
  );
};

export default UserTable;
