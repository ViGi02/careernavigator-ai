import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

export const getProfile = async (
  token
) => {
  const response = await axios.get(
    `${API_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const addSkill = async (
  skill,
  token
) => {
  const response = await axios.post(
    `${API_URL}/skills`,
    { skill },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};