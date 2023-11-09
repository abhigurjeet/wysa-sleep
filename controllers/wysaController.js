const User = require("../models/user");
const Assessment = require("../models/assessment");
const Question = require("../models/question");
const jwt = require("jsonwebtoken");

exports.createNewUser = async (req, res) => {
  const { nickName, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ nickName: nickName });
    if (existingUser) {
      return res.status(409).json({ error: "Nickname already exists" });
    }

    const newUser = new User({ nickName: nickName, password: password });

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
exports.getUser = async (req, res) => {
  const { nickName, password } = req.body;

  try {
    const user = await User.findOne({ nickName, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
exports.getAssessment = async (req, res) => {
  const { nickName } = req.body;

  try {
    let tempQuestions = await Question.find();
    const questions = tempQuestions.map((item) => ({
      text: item.text,
      options: item.options,
    }));
    console.log(questions);
    const existingAssessment = await Assessment.findOne({ nickName });

    if (existingAssessment) {
      return res.status(200).json(existingAssessment);
    }

    // If assessment doesn't exist, create a new one with all available questions
    const newAssessment = new Assessment({
      assessmentId: "someGeneratedId", // Generate a unique assessmentId
      nickName,
      questions,
      date: new Date(),
    });

    await newAssessment.save();

    return res.status(201).json(newAssessment);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
exports.createQuestion = async (req, res) => {
  const { text, options } = req.body;

  try {
    const existingQuestion = await Question.findOne({ text });

    if (existingQuestion) {
      return res
        .status(409)
        .json({ error: "Question with the same text already exists" });
    }
    const newQuestion = new Question({ text, options });
    await newQuestion.save();

    return res.status(201).json(newQuestion);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
