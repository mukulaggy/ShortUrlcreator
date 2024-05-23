const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    requiredUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }  // Corrected to 'timestamps' to enable automatic createdAt and updatedAt fields
);

const URL = mongoose.model("URL", urlSchema);  // Capitalized model name to follow convention

module.exports = URL;
