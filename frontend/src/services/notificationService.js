import { api } from "./api";

export const getNotifications = async () => {
  try {
    const response = await api.get("/notifications");

    console.log("API Response:", response.data);

    // Return the notifications array
    return response.data.notifications || [];
  } catch (error) {
    console.error("Notification Error:", error);
    return [];
  }
};