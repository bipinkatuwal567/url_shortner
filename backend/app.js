import express from "express";
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongodb.config.js";
import dotenv from "dotenv";
import urlSchema from "./src/model/urlShortner.model.js";

const app = express();
dotenv.config("./.env");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/", async (req, res) => {
  const { url } = req.body;
  const short_url = nanoid(7);

  try {
    const newURL = new urlSchema({
      full_url: url,
      short_url,
    });

    await newURL.save();
    res.status(200).json({
      status: true,
      message: `Your URL has been shorten to ${short_url}`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  const url = await urlSchema.findOne({
    short_url: id,
  });

  if (url) {
    res.redirect(url.full_url);
  } else {
    res.send("Sorry, this URL isn't shorten");
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("App is running on port 3000");
});
