const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobTitle: {
      type: String,
      default: "Untitled Job",
    },

    score: Number,

    careerTracks: [String],

    matchedSkills: [String],

    missingSkills: [String],
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