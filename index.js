require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const wysaRoutes = require("./routes/wysaRoutes");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.use("/", wysaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
