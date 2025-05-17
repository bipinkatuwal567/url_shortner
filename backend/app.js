import express from "express";
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongodb.config.js";
import dotenv from "dotenv";
import urlSchema from "./src/model/urlShortner.model.js";
import url_shortnerRouter from "./src/routes/url_shortner.route.js"
import { redirectUserFromShortUrl } from "./src/controller/url_shortner.controller.js";

const app = express();
dotenv.config("./.env");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/create", url_shortnerRouter)

app.get("/:id", redirectUserFromShortUrl);

app.listen(3000, () => {
  connectDB();
  console.log("App is running on port 3000");
});
