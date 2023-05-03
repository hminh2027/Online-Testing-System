const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const {
  errorHandler,
  errorConverter,
} = require("./middlewares/error.middleware");
const { config } = require("./config");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});
app.use(errorConverter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
