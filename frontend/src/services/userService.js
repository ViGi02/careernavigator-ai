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

export const deleteSkill = async (
  skill,
  token
) => {
  const response = await axios.delete(
    `${API_URL}/skills`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { skill },
    }
  );

  return response.data;
};

export const updateCareerGoal =
  async (
    careerGoal,
    token
  ) => {
    const response =
      await axios.put(
        `${API_URL}/career-goal`,
        { careerGoal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const addMultipleSkills =
  async (
    skills,
    token
  ) => {
    const response =
      await axios.post(
        `${API_URL}/skills/bulk`,
        { skills },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };