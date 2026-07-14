import express from "express";
import noteRoutes from "./src/routes/note.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Notes API is running" });
});

app.use("/notes", noteRoutes);

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;