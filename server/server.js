const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const dashboardRoute = require("./routes/api/dashboard.js");

const configuration = require("./config/constants.js");

/* Express setup */
const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5003;
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Connect to database */
const Student = require("./models/Student.js");
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

/* Define Routes */
app.use("/api/dashboard", dashboardRoute);

/* Heroku */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
);

function stop() {
  server.close();
}

module.exports = app;
module.exports.stop = stop;
