import express from "express";
import { authMiddleware, requireMobileClient } from "../../middleware/auth.js";
import { createProjectHandler } from "./handlers.js";

export const mobileProjectRouter = express.Router();

mobileProjectRouter.use(requireMobileClient);

mobileProjectRouter.post("/create", authMiddleware, createProjectHandler);
