
const express = require("express");

const {
  createProject,
  getProjects
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All project routes require authentication
router.use(protect);

router.post("/", createProject);
router.get("/", getProjects);

module.exports = router;
