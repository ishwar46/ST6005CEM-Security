import React, { useEffect, useState, useMemo } from "react";
import { getAllUsersApi } from "../../apis/Api";
import Lottie from "lottie-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QRCode from "qrcode.react";
import { FaQrcode, FaCalendarAlt } from "react-icons/fa";
import Modal from "react-modal";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Pagination from "@mui/material/Pagination";
import loadingAnimation from "../../assets/animations/loading.json";
import institutions from "../../data/institution";
import nodata from "../../assets/animations/nodata.json";

// Modal styles
const customStyles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
    border: "5px dotted green",
    backgroundColor: "#fff",
  },
};

const COLORS = ["#009B53", "#FF1F44"];

const ParticipantAttendance = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [qrUserId, setQrUserId] = useState(null);
  const [qrUserName, setQrUserName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getAllUsersApi();
        if (response && response.data && response.data.users) {
          setUsers(response.data.users);
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
    const intervalId = setInterval(fetchUsers, 40000);
    return () => clearInterval(intervalId);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesInstitution = selectedInstitution
        ? user.personalInformation.nameOfInstitution === selectedInstitution
        : true;
      const hasAttendanceInRange =
        startDate && endDate
          ? user.attendance.some((att) => {
              const attDate = new Date(att.date);
              return attDate >= startDate && attDate <= endDate;
            })
          : true;
      const hasAttendanceOnSelectedDate = selectedDate
        ? user.attendance.some((att) => {
            const attDate = new Date(att.date).toDateString();
            return attDate === selectedDate;
          })
        : true;
      const matchesStatus = selectedStatus
        ? user.attendance.some(
            (att) =>
              att.status === (selectedStatus === "present") &&
              (!startDate || new Date(att.date) >= startDate) &&
              (!endDate || new Date(att.date) <= endDate)
          ) ||
          (selectedStatus === "absent" && user.attendance.length === 0)
        : true;
      const matchesSearchQuery =
        searchQuery === "" ||
        user.personalInformation.fullName.firstName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.personalInformation.fullName.middleName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.personalInformation.fullName.lastName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        user.personalInformation.emailAddress
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return (
        matchesInstitution &&
        hasAttendanceInRange &&
        hasAttendanceOnSelectedDate &&
        matchesStatus &&
        matchesSearchQuery
      );
    });
  }, [
    users,
    selectedInstitution,
    selectedStatus,
    startDate,
    endDate,
    selectedDate,
    searchQuery,
  ]);

  const attendanceCounts = useMemo(() => {
    let present = 0;
    let absent = 0;
    filteredUsers.forEach((user) => {
      if (user.attendance.length === 0) {
        absent++;
      } else {
        user.attendance.forEach((att) => {
          const attDate = new Date(att.date);
          if (
            (selectedDate ? attDate.toDateString() === selectedDate : true) &&
            (!startDate || attDate >= startDate) &&
            (!endDate || attDate <= endDate)
          ) {
            if (att.status) {
              present++;
            } else {
              absent++;
            }
          }
        });
      }
    });
    return { present, absent };
  }, [filteredUsers, startDate, endDate, selectedDate]);

  const handleInstitutionChange = (e) => {
    setSelectedInstitution(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const openModal = (userId, userName) => {
    setQrUserId(userId);
    setQrUserName(userName);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setQrUserId(null);
    setQrUserName("");
  };

  const attendanceData = [
    { name: "Present", value: attendanceCounts.present },
    { name: "Absent", value: attendanceCounts.absent },
  ];

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate date options for the dropdown (last 7 days)
  const generateDateOptions = () => {
    const options = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      options.push(date);
    }
    return options;
  };

  const dateOptions = generateDateOptions();

  return (
    <div className="mt-2 min-h-screen">
      <h1 className="text-2xl font-bold text-start mb-4 text-black">
        Participants Attendance
      </h1>
      <div className="mt-5 p-5 border border-gray-200 rounded-md bg-white shadow-sm">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
              Filter by Institution
            </label>
            <select
              id="institution"
              value={selectedInstitution}
              onChange={handleInstitutionChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 text-gray-900"
            >
              <option value="">All Institutions</option>
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.name}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
              Filter by Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 text-gray-900"
            >
              <option value="">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
              Search by Name or Email
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 text-gray-900"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">
              Select Date (Last 7 Days)
            </label>
            <select
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 text-gray-900"
            >
              <option value="">All Dates</option>
              {dateOptions.map((date) => (
                <option key={date.toISOString()} value={date.toDateString()}>
                  {date.toDateString()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-1 space-x-2 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">From</label>
            <div className="relative">
              <DatePicker
                placeholderText="Select From Date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="block w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 text-gray-900"
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700">To</label>
            <div className="relative">
              <DatePicker
                placeholderText="Select To Date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="block w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 text-gray-900"
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-4 text-gray-800">
        <span className="font-semibold text-green-600">
          Present: {attendanceCounts.present}
        </span>{" "}
        |{" "}
        <span className="font-semibold text-red-600">
          Absent: {attendanceCounts.absent}
        </span>
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 pr-2 mb-4 md:mb-0">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
            <thead className="bg-green-800">
              <tr className="text-white">
                <th className="py-3 px-6 text-left font-semibold text-white">
                  Name
                </th>
                <th className="py-3 px-6 text-left font-semibold text-white">
                  Email
                </th>
                <th className="py-3 px-6 text-left font-semibold text-white">
                  Institution
                </th>
                <th className="py-3 px-6 text-left font-semibold text-white">
                  Attendance Status
                </th>
                <th className="py-3 px-6 text-left font-semibold text-white">
                  Date & Time
                </th>
                <th className="py-3 px-6 text-left font-semibold text-white">
                  QR
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => {
                  const fullName = `${user.personalInformation.fullName.firstName} ${user.personalInformation.fullName.middleName} ${user.personalInformation.fullName.lastName}`;
                  const email = user.personalInformation.emailAddress;
                  const institution = user.personalInformation.nameOfInstitution;

                  if (user.attendance.length === 0) {
                    return (
                      (selectedStatus === "" ||
                        selectedStatus === "absent") && (
                        <tr key={user._id} className="bg-white text-gray-700">
                          <td className="py-3 px-6">{fullName}</td>
                          <td className="py-3 px-6">{email}</td>
                          <td className="py-3 px-6">{institution}</td>
                          <td className="py-3 px-6">
                            <span className="inline-block px-3 py-1 font-semibold text-sm leading-tight text-red-800 bg-red-200 rounded-full">
                              Absent
                            </span>
                          </td>
                          <td className="py-3 px-6">N/A</td>
                          <td className="py-3 px-6">
                            <button
                              onClick={() => openModal(user._id, fullName)}
                              className="text-blue-500 underline"
                            >
                              <FaQrcode />
                            </button>
                          </td>
                        </tr>
                      )
                    );
                  }

                  return user.attendance.map((att) => {
                    const attDate = new Date(att.date);
                    if (
                      (!startDate || attDate >= startDate) &&
                      (!endDate || attDate <= endDate) &&
                      (selectedDate ? attDate.toDateString() === selectedDate : true) &&
                      (selectedStatus === "" ||
                        (selectedStatus === "present" && att.status) ||
                        (selectedStatus === "absent" && !att.status))
                    ) {
                      return (
                        <tr
                          key={att._id.$oid}
                          className="bg-white text-gray-700"
                        >
                          <td className="py-3 px-6">{fullName}</td>
                          <td className="py-3 px-6">{email}</td>
                          <td className="py-3 px-6">{institution}</td>
                          <td className="py-3 px-6">
                            <span
                              className={`inline-block px-3 py-1 font-semibold text-sm leading-tight ${
                                att.status
                                  ? "text-green-800 bg-green-200"
                                  : "text-red-800 bg-red-200"
                              } rounded-full`}
                            >
                              {att.status ? "Present" : "Absent"}
                            </span>
                          </td>
                          <td className="py-3 px-6">
                            {att.date
                              ? new Date(att.date).toLocaleString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "N/A"}
                          </td>
                          <td className="py-3 px-6">
                            <button
                              onClick={() => openModal(user._id, fullName)}
                              className="text-blue-500 underline"
                            >
                              <FaQrcode />
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  });
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-10">
                    <div className="flex justify-center items-center">
                      <div className="w-64 h-64">
                        <Lottie animationData={nodata} loop={true} />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="QR Code Modal"
        ariaHideApp={false}
      >
        <h2 className="text-xl mb-4 text-blue-700">{qrUserName}</h2>
        {qrUserId && <QRCode value={qrUserId} size={256} />}
        <button
          onClick={closeModal}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ParticipantAttendance;
