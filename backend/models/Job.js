const mongoose = require("mongoose");

const jobSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: String,

      description: String,

      readinessScore: {
        type: Number,
        default: 0,
      },

      missingSkills: [String],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Job",
    jobSchema
  );
