const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addSkill = async (req, res) => {
  try {
    const { skill } = req.body;

    const user = await User.findById(
      req.user.id
    );

    user.skills.push(skill);

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  addSkill,
};