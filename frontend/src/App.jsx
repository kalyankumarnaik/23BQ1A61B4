import { useEffect, useState } from "react";
import { getNotifications } from "./services/notificationService";
import { Log } from "./utils/logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Log("info", "page", "Fetching notifications");

        const data = await getNotifications();

        console.log("Notifications:", data);

        setNotifications(data);

        await Log(
          "info",
          "api",
          "Notifications fetched successfully"
        );
      } catch (error) {
        console.error(error);

        await Log(
          "error",
          "api",
          "Failed to fetch notifications"
        );
      }
    };

    fetchData();
  }, []);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (item) => item.Type === filter
        );

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const priorityNotifications = [...notifications]
    .sort((a, b) => {
      const weightA = weights[a.Type] || 0;
      const weightB = weights[b.Type] || 0;

      if (weightB !== weightA) {
        return weightB - weightA;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    })
    .slice(0, 10);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <h1>Campus Notifications</h1>

      <p>Total Notifications: {notifications.length}</p>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button
          onClick={() => setFilter("Event")}
          style={{ marginLeft: "10px" }}
        >
          Event
        </button>

        <button
          onClick={() => setFilter("Result")}
          style={{ marginLeft: "10px" }}
        >
          Result
        </button>

        <button
          onClick={() => setFilter("Placement")}
          style={{ marginLeft: "10px" }}
        >
          Placement
        </button>
      </div>

      <h2>Priority Inbox (Top 10)</h2>

      {priorityNotifications.map((item) => (
        <div
          key={item.ID}
          className="priority-card"
        >
          <h3>{item.Type}</h3>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}

      <h2>All Notifications</h2>

      {filteredNotifications.map((item) => (
        <div
          key={item.ID}
          className="notification-card"
        >
          <h3>{item.Type}</h3>
          <p>{item.Message}</p>
          <small>{item.Timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default App;