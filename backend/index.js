const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(express.json());
require("./Models/db");
const TaskRouter = require("./Routes/TaskRouter");
const userRoutes = require("./Routes/userRoutes");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
app.use(cors());

app.use(bodyParser.json());

app.use("/api/user", userRoutes);

app.use("/tasks", TaskRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("sever");
});
