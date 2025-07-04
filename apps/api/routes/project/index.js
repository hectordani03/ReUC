import express from "express";
import csurf from "csurf";
import { authMiddleware } from "../../middleware/auth.js";
import { createProjectHandler } from "./handlers.js";

export const projectRouter = express.Router();
const csrfProtection = csurf({ cookie: true });

projectRouter.post(
  "/create",
  authMiddleware,
  csrfProtection,
  createProjectHandler
);
