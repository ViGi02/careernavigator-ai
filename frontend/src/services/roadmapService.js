import axios from "axios";

const API_URL =
  "http://localhost:5000/api/roadmap";

export const generateRoadmap =
  async (
    missingSkills,
    token
  ) => {
    const response =
      await axios.post(
        `${API_URL}/generate`,
        { missingSkills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };