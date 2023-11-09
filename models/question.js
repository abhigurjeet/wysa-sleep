const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, // This field is now required
  },
  options: [String],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
