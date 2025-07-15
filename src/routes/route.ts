import { Router } from "express";

import { createShortenedUrl, redirect } from "../controllers";

const router = Router();

router.post("/create-url" , createShortenedUrl);

router.get("/:shortcode" , redirect);

export default router