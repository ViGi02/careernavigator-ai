import axios from "axios";

const API_URL =
  "http://localhost:5000/api/cv";

export const analyzeCV =
  async (
    file,
    token
  ) => {
    const formData =
      new FormData();

    formData.append(
      "cv",
      file
    );

    const response =
      await axios.post(
        `${API_URL}/analyze`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const analyzeCVText =
  async (
    cvText,
    token
  ) => {
    const response =
      await axios.post(
        `${API_URL}/analyze-text`,
        { cvText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };