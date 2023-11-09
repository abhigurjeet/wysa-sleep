const mongoose = require("mongoose");
const Question = require("./question"); // Assuming the Question schema is in a separate file
const User = require("./user");
const assessmentSchema = new mongoose.Schema({
  assessmentId: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    ref: "User",
    required: true,
  },
  questions: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

module.exports = Assessment;
