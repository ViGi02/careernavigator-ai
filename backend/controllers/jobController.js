const Job =
  require("../models/Job");

const User =
  require("../models/User");

const calculateReadiness =
  require(
    "../services/calculateReadiness"
  );

const saveJob =
  async (req, res) => {

    try {

      const {
        title,
        description,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const readinessData =
        calculateReadiness(
          user.skills,
          description
        );

      const readinessScore =
        readinessData.score;

      const missingSkills =
        readinessData.missingSkills;

      const job =
        await Job.create({
          user:
            req.user.id,
          title,
          description,
          readinessScore,          
          missingSkills:
              readinessData
                .missingSkills,
        });

      res.json(job);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const getJobs =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      const jobs =
        await Job.find({
          user: req.user.id,
        });

      for (
        const job of jobs
      ) {

        const readinessData =
          calculateReadiness(
            user.skills,
            job.description
          );

        job.readinessScore =
          readinessData.score;

        job.missingSkills =
          readinessData.missingSkills;

        await job.save();

      }

      const updatedJobs =
        await Job.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.json(
        updatedJobs
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const deleteJob =
  async (req, res) => {

    try {

      await Job.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Job deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const getJobById =
  async (req, res) => {

    try {

      const job =
        await Job.findById(
          req.params.id
        );

      res.json(job);

    } catch (error) {

      res.status(500).json({
        message:
          error.message
      });

    }

  };

module.exports = {
  saveJob,
  getJobs,
  deleteJob,
  getJobById,
};