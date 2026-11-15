
const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required"
      });
    }

    const project = await Project.create({
      name: name.trim(),
      description:
        typeof description === "string" ? description.trim() : "",
      owner: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project
    });
  } catch (error) {
    console.error("Create project error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// GET MY PROJECTS
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    console.error("Get projects error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = { createProject, getProjects };
