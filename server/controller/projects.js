const projectModel = require("../models/projects");

class Project {
  async getAllProjects(req, res) {
    try {
      let Projects = await projectModel.find({}).populate().sort({ _id: -1 });
      if (Projects) {
        return res.json({ Projects });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const projectsController = new Project();
module.exports = projectsController;
