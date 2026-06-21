const generateRoadmap = require(
  "../services/roadmapGenerator"
);

const Roadmap = require(
  "../models/Roadmap"
);

const getRoadmap = async (
  req,
  res
) => {
  try {
    const { missingSkills } =
      req.body;

    const roadmap =
      generateRoadmap(
        missingSkills
      );

    res.json({
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRoadmaps =
  async (req, res) => {
    try {
      const roadmaps =
        await Roadmap.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(
        roadmaps
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const toggleTask =
  async (req, res) => {
    try {

      const {
        roadmapId,
        taskIndex,
      } = req.body;

      const roadmap =
        await Roadmap.findById(
          roadmapId
        );

      roadmap.tasks[
        taskIndex
      ].completed =
        !roadmap.tasks[
          taskIndex
        ].completed;

      await roadmap.save();

      res.json(
        roadmap
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

const saveRoadmap = async (
  req,
  res
) => {
  try {
    const {
      title,
      tasks,
    } = req.body;

    const roadmapTasks =
      tasks.map((task) => ({
        title: task,
        completed: false,
      }));

    const roadmap =
      await Roadmap.create({
        user: req.user.id,
        title,
        tasks: roadmapTasks,
      });

    res.json(
      roadmap
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  getRoadmap,
  saveRoadmap,
  getRoadmaps,
  toggleTask,
};