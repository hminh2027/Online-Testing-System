const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const {
  errorHandler,
  errorConverter,
} = require("./middlewares/error.middleware");
const { config } = require("./config");
const cors = require("cors");

// GPT

// Init & config
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  Router
app.get("/gpt", async (req, res) => {
  try {
    res.status(200).json();
  } catch (e) {
    console.log(e);
  }
});
app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// Error handlers
app.use(errorConverter);
app.use(errorHandler);

// Listen
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
