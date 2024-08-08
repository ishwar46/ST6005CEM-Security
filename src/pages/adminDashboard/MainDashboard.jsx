import React, { useState, useEffect } from "react";
import UserTable from "./UserRegTable";
import { getAllUsersApi, getAllSpeakersApi } from "../../apis/Api";
import useDocumentTitle from "../../components/DocTitle";

const MainDashboard = () => {
  useDocumentTitle("Admin Dashboard - ACSIC Conference ");
  const [userCount, setUserCount] = useState(0);
  const [pendingUserCount, setPendingUserCount] = useState(0);
  const [speakerCount, setSpeakerCount] = useState(0);

  useEffect(() => {
    fetchUserCounts();
    fetchSpeakerCounts();
  }, []);

  const fetchUserCounts = async () => {
    try {
      const response = await getAllUsersApi();
      if (response && response.data && response.data.users) {
        const users = response.data.users;
        setUserCount(users.length);

        const pendingUsers = users.filter(
          (user) => user.adminVerification.status === "pending"
        );
        setPendingUserCount(pendingUsers.length);
      }
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  const fetchSpeakerCounts = async () => {
    try {
      const response = await getAllSpeakersApi();
      if (response && response.data && response.data.speakers) {
        const speakers = response.data.speakers;
        setSpeakerCount(speakers.length);
      }
    } catch (error) {
      console.error("Error fetching speaker counts:", error);
    }
  };

  return (
    <>
      <div className="text-2xl font-bold text-start text-black  mt-2">
        Dashboard
      </div>
      <div className="pt-5">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          <div className="border rounded-xl p-5 bg-white">
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#3051A0"
                className="w-10 h-10 bg-[#f8f6fe] p-2 rounded"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <div className="text-1xl text-gray-800 font-semibold">
                Total Registered
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-600">{userCount}</div>
          </div>
          <div className="border rounded-xl p-5 bg-white">
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#B88D00"
                className="w-10 h-10 bg-[#f8f6fe] p-2 rounded"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <div className="text-1xl text-gray-800 font-semibold">
                Pending Requests
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-600">
              {pendingUserCount}
            </div>
          </div>
          <div className="border rounded-xl p-5 bg-white">
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#006E12"
                className="w-10 h-10 bg-[#f8f6fe] p-2 rounded"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <div className="text-1xl text-gray-800 font-semibold">
                Notification Sent
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-600">0</div>
          </div>

          <div className="border rounded-xl p-5 bg-white">
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#AA0085"
                className="w-10 h-10 bg-[#f8f6fe] p-2 rounded"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <div className="text-1xl text-gray-800 font-semibold">
                Total Speakers
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-600">{speakerCount}</div>
          </div>
        </div>
        {/* Table */}
        <UserTable />
      </div>
    </>

  );
};

export default MainDashboard;
