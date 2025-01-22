import { useState, useEffect } from "react";

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("profileId"));
      if (!userId) return;
      const response = await fetch(`/api/notifications?userId=${userId}`);
      const data = await response.json();
      setUnreadCount(data.length);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => console.log("Show notifications")}
        className="relative bg-gray-200 p-3 rounded-full"
      >
        <span role="img" aria-label="bell">
          🔔
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;
