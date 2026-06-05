import { api } from "../services/api";

export const Log = async (
  level,
  packageName,
  message
) => {
  try {
    const response = await api.post("/logs", {
      stack: "frontend",
      level,
      package: packageName,
      message
    });

    console.log("Log Success:", response.data);
  } catch (error) {
    console.error("Log Error:", error);
  }
};