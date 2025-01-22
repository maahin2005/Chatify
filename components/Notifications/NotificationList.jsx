"use client";

import React, { useEffect, useState } from "react";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("profileId"));
      if (!userId) throw new Error("User ID is missing.");

      const response = await fetch(`/api/notification?userId=${userId}`);
      const data = await response.json();
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      await fetch(`/api/notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });

      // Remove the notification from the list
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p>Loading notifications...</p>;

  if (notifications.length === 0) {
    return <p>No new notifications</p>;
  }

  return (
    <div className="notification-list bg-gray-100 rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="flex justify-between items-center bg-white p-3 mb-2 shadow-sm rounded"
          >
            <p>{notification.message.content}</p>
            <button
              onClick={() => markAsRead(notification.id)}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Mark as Read
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
