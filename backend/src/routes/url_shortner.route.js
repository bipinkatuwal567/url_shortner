import express from "express"
import { createShortURL } from "../controller/url_shortner.controller.js";

const router = express.Router();

router.post("/", createShortURL);

export default router;