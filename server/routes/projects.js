const express = require("express");
const router = express.Router();
const projectsController = require("../controller/projects");

router.get("/get-all-projects", projectsController.getAllProjects);

module.exports = router;
