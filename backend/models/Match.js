const mongoose = require("mongoose");

const matchSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      score: Number,

      careerTracks: [String],

      missingSkills: [String],

      matchedSkills: [String],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Match",
    matchSchema
  );