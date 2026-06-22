const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const cvRoutes = require("./routes/cvRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const careerGoalRoutes = require("./routes/careerGoalRoutes");
const jobRoutes = require("./routes/jobRoutes");
const insightRoutes = require("./routes/insightRoutes");

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/career-goal", careerGoalRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/insights", insightRoutes);

app.get("/", (req, res) => {
  res.send("CareerNavigator API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});