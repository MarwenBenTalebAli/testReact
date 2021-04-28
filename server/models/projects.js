const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
    },
    planned_start_date: {
      type: Number,
    },
    planned_end_date: {
      type: Number,
    },
    sub_projects: {
      type: Array,
      default: null,
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

const projectModel = mongoose.model("projects", projectSchema);
module.exports = projectModel;
