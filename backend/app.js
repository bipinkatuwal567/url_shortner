import express from "express";
import { nanoid } from "nanoid";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/", (req, res) => {
  const {url} = req.body;
  res.send(nanoid(7))
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
