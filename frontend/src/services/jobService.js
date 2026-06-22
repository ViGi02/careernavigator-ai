import axios from "axios";

const API_URL =
  "http://localhost:5000/api/jobs";

export const saveJob =
  async (
    title,
    description,
    token
  ) => {

    const response =
      await axios.post(
        `${API_URL}/save`,
        {
          title,
          description,
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

export const getJobs =
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

export const deleteJob =
  async (
    id,
    token
  ) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const getJobById =
  async (
    id,
    token
  ) => {

    const response =
      await axios.get(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};