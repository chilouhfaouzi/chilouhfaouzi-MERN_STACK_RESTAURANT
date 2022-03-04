import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js"; // routes of restaurants api

const app = express();

app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // To parse JSON data

app.use("/api/restaurants", restaurants); // To use restaurants api

// Route Not Found
app.use("*", (req, res) => {
  res.status(404).send({
    error: "Not Found",
  });
});

export default app; // Export App as a module
