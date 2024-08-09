import React, { useEffect, useState } from "react";
import excelIcon from "../../assets/images/sheet.png";
import * as XLSX from "xlsx";
import { getLoginActivitiesApi, deleteLoginActivityApi } from "../../apis/Api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";

const LoginActivities = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const response = await getLoginActivitiesApi();
        setActivities(response.data.activities);
      } catch (error) {
        console.error("Error fetching login activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      activities.map((activity) => ({
        "Email/Username": activity.email,
        Role: activity.role,
        Success: activity.success ? "Yes" : "No",
        Message: activity.message,
        Endpoint: activity.endpoint,
        Timestamp: new Date(activity.timestamp).toLocaleString(),
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LoginActivities");

    XLSX.writeFile(wb, "login_activities.xlsx");
  };

  const deleteLoginActivity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }
    try {
      const response = await deleteLoginActivityApi(id);
      if (response && response.data.success) {
        toast.success("Login activity deleted successfully.");
        setActivities(activities.filter((activity) => activity._id !== id));
      } else {
        toast.error("Failed to delete login activity.");
      }
    } catch (error) {
      toast.error(`Error deleting login activity: ${error.message}`);
    }
  };

  const handleViewDetails = (details) => {
    setSelectedDetails(details);
    setIsModalOpen(true);
  };

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  return (
    <div className="mt-5">
      {activities.length > 0 ? (
        <div className="border rounded-xl p-5 bg-transparent shadow-md">
          <div className="text-xl text-gray-800 mb-3 font-bold">
            Login Activities
          </div>
          <div className="mb-5 flex justify-end">
            <button
              onClick={exportToExcel}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded flex items-center mt-4 sm:mt-0"
            >
              <img
                src={excelIcon}
                alt="Export to Excel"
                className="w-6 h-6 mr-2"
              />
              Export to Excel
            </button>
          </div>

          <table className="min-w-full leading-normal bg-transparent shadow-md">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email/Username
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Success
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Request Details
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((activity, index) => (
                <tr key={activity._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    {indexOfFirstActivity + index + 1}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    {activity.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    {activity.role}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    {activity.success ? "Yes" : "No"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    {activity.message}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    {activity.endpoint}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    <button
                      onClick={() => handleViewDetails(activity.requestDetails)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Details
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    {new Date(activity.timestamp).toLocaleString()}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-transparent text-sm text-gray-600">
                    <button
                      onClick={() => deleteLoginActivity(activity._id)}
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
              count={Math.ceil(activities.length / activitiesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      ) : (
        <div className="text-gray-800">No login activities available.</div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={selectedDetails}
      />
    </div>
  );
};

export default LoginActivities;
