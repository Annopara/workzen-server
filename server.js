const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

// basic home route
const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");

// all users routes
app.use("/events", eventRoutes);
app.use("/events", userRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
