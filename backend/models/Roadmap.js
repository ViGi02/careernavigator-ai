const mongoose = require("mongoose");

const roadmapSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        default:
          "Learning Roadmap",
      },

      tasks: [
        {
          title: String,

          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Roadmap",
  roadmapSchema
);