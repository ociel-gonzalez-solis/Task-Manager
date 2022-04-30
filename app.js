const express = require("express");
const app = express();
const tasks = require("./routes/task");
const connectDB = require("./db/connect");
const notFound = require("./middleware/404");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const port = process.env.PORT || 3000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
// app.get("/", (req, res, next) => {
//   res.send("Welcome");
// });

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("Server is listening on port " + port));
  } catch (err) {
    console.log(err);
  }
};

start();
