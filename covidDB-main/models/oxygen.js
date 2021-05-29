const mongoose = require("mongoose");

const oxygenSchema = new mongoose.Schema(
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

const Oxygen = mongoose.model("Oxygen", oxygenSchema);
module.exports = Oxygen;
