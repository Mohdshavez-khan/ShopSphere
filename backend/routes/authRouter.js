import authController from "../controllers/authController.js";
import express from "express";
const router = express.Router();
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { userValidate } from "../Schema.js";
import { validate } from "../middlewares/validationMiddleware.js";

router.post("/register", validate(userValidate) ,  wrapAsync(authController.register));
router.post("/login", wrapAsync(authController.Login));
router.get("/profile", isLoggedIn, wrapAsync(authController.getProfile));

export default router;