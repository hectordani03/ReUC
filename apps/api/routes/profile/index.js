import express from "express";
import csurf from "csurf";
import { authMiddleware, requireOutsider } from "../../middleware/auth.js";
import { editProfileHandler, getProfileHandler } from "./handlers.js";

export const profileRouter = express.Router();
const csrfProtection = csurf({ cookie: true });

profileRouter.post("/get", authMiddleware, requireOutsider, getProfileHandler);
profileRouter.post(
  "/edit",
  authMiddleware,
  csrfProtection,
  requireOutsider,
  editProfileHandler
);
