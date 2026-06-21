import axios from "axios";

const API_URL =
  "http://localhost:5000/api/match";

export const analyzeMatch = async (
  jobDescription,
  token
) => {
  const response = await axios.post(
    `${API_URL}/analyze`,
    { jobDescription },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMatchHistory =
  async (token) => {

    const response =
      await axios.get(
        `${API_URL}/history`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};