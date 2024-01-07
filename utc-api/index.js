const express = require("express");
const app = express();
const routers = require("./routers/index");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;

routers(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.listen(PORT, () => console.log(`Server is working on ${PORT}!!`));

module.exports = app;
