const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const fare = require("./routes/fare");
app.use("/api", fare);

app.listen(5000, () => console.log("Server running on port 5000"));
