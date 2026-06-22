import axios from "axios";

const API_URL =
  "http://localhost:5000/api/career-goal";

export const getGoalProgress =
  async (token) => {

    const response =
      await axios.get(
        `${API_URL}/progress`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};
