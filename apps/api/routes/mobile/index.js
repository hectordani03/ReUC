import express from "express";
import { mobileAuthRouter } from "../auth/mobile.js";
import { mobileProjectRouter } from "../project/mobile.js";
import { mobileProfileRouter } from "../profile/mobile.js";

const mobileRouter = express.Router();

mobileRouter.use("/auth", mobileAuthRouter);
mobileRouter.use("/project", mobileProjectRouter);
mobileRouter.use("/outsider", mobileProfileRouter);

export default mobileRouter;
