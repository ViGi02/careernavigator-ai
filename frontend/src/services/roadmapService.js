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

export const saveRoadmap =
  async (
    title,
    tasks,
    token
  ) => {

    const response =
      await axios.post(
        `${API_URL}/save`,
        {
          title,
          tasks,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getRoadmaps =
  async (token) => {
    const response =
      await axios.get(
        `${API_URL}/all`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const toggleTask =
  async (
    roadmapId,
    taskIndex,
    token
  ) => {

    const response =
      await axios.put(
        `${API_URL}/toggle-task`,
        {
          roadmapId,
          taskIndex,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};