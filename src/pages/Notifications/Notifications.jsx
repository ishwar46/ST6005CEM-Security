import React, { useState, useEffect } from "react";
import { getAllNotificationsApi, decryptNotificationApi } from "../../apis/Api";
import { io } from "socket.io-client";
import {
  LockClosedIcon,
  LockOpenIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decryptedMessages, setDecryptedMessages] = useState({});

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    getAllNotificationsApi()
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
      });

    const socket = io("http://localhost:5500");

    socket.on("receiveNotification", (newNotification) => {
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);

      if (Notification.permission === "granted") {
        new Notification("New Notification", {
          body: newNotification.title,
        });
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDecrypt = (id) => {
    decryptNotificationApi(id, decryptionKey)
      .then((response) => {
        setDecryptedMessages((prev) => ({
          ...prev,
          [id]: response.data.message,
        }));
      })
      .catch((error) => {
        alert("Failed to decrypt: " + error.response.data.error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center space-x-2">
        <LockClosedIcon className="h-8 w-8 text-blue-500" />
        <span>Notices</span>
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the decryption key provided by the admin to view the contents of
        encrypted messages. If you don't have the key, please contact the admin.
      </p>
      <div className="mb-8 flex items-center space-x-3">
        <KeyIcon className="h-6 w-6 text-gray-500" />
        <input
          type="password"
          placeholder="Enter decryption key"
          value={decryptionKey}
          onChange={(e) => setDecryptionKey(e.target.value)}
          className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul className="space-y-6">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className="p-6 bg-gray-100 rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center space-x-2">
              <span>{notification.title}</span>
              {decryptedMessages[notification._id] ? (
                <LockOpenIcon className="h-6 w-6 text-green-500" />
              ) : (
                <LockClosedIcon className="h-6 w-6 text-red-500" />
              )}
            </h3>
            <p className="mt-4 text-gray-600">
              {decryptedMessages[notification._id]
                ? decryptedMessages[notification._id]
                : "Encrypted message"}
            </p>
            {!decryptedMessages[notification._id] && (
              <button
                onClick={() => handleDecrypt(notification._id)}
                className="mt-6 inline-flex items-center px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <KeyIcon className="h-5 w-5 mr-2" />
                Decrypt Message
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
