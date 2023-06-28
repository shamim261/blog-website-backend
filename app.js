// internal imports
const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// external imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routes/loginRouter");
const usersRouter = require("./routes/usersRouter");
const blogRouter = require("./routes/blogRouter");

const app = express();
const server = http.createServer(app);
dotenv.config();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// mongoose connect
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(console.log("Database connected successfully"))
  .catch((err) => {
    console.log(err);
  });

// routing setup
app.use("/", loginRouter);
app.use("/api/users", usersRouter);
app.use("/blog", blogRouter);

// error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
