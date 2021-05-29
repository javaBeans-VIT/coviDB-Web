const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state_id: {
      type: String,
      required: true,
    },
    district_id: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
