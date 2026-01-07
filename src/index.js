const express = require("express");
require("dotenv").config();

const tutorRoutes = require("./routes/tutor.routes");
const catRoutes = require("./routes/cat.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/tutors", tutorRoutes);
app.use("/cats", catRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(3000, () => {
  console.log("🐱 CatCare API rodando na porta 3000");
});
