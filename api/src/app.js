const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const {
  errorHandler,
  errorConverter,
} = require("./middlewares/error.middleware");
const { config } = require("./config");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const { socketServer } = require("./socket");

// Init & config
const app = express();
const server = http.createServer(app);
// Socket
const io = new Server(server, {
  cors: {
    origin: true,
  },
});

socketServer(io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  Router
app.use("/api", router);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// Error handlers
app.use(errorConverter);
app.use(errorHandler);

// Listen
server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
