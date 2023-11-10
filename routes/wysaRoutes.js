const express = require("express");
const wysaController = require("../controllers/wysaController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", wysaController.createNewUser);
router.post("/login", wysaController.getUser);
router.get("/assessment", verifyToken, wysaController.getAssessment);
router.post("/addQuestion", verifyToken, wysaController.createQuestion);

module.exports = router;
