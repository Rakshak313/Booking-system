const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    expertise: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    hourlyRate: {
      type: Number,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expert", expertSchema);