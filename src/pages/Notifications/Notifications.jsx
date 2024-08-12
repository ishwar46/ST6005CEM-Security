import React, { useState, useEffect } from "react";
import { getAllNotificationsApi, decryptNotificationApi } from "../../apis/Api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decryptedMessages, setDecryptedMessages] = useState({});

  useEffect(() => {
    // Fetch all notifications using the API call
    getAllNotificationsApi()
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch notifications:", error);
      });
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Notifications
      </h2>
      <div className="mb-6">
        <input
          type="password"
          placeholder="Enter decryption key"
          value={decryptionKey}
          onChange={(e) => setDecryptionKey(e.target.value)}
          className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification._id}
            className="p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-medium text-gray-700">
              {notification.title}
            </h3>
            <p className="mt-2 text-gray-600">
              {decryptedMessages[notification._id]
                ? decryptedMessages[notification._id]
                : "Encrypted message"}
            </p>
            {!decryptedMessages[notification._id] && (
              <button
                onClick={() => handleDecrypt(notification._id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
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
