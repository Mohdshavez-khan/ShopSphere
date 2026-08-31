import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ManageUsers , changeUsersRole , userDelete } from "../controllers/adminUserManageControlller.js";

const router = express.Router();

router.get("/" , isLoggedIn , isAdmin , wrapAsync(ManageUsers));
router.patch("/:id/role" , isLoggedIn , isAdmin , wrapAsync(changeUsersRole));
router.delete("/:id" , isLoggedIn , isAdmin , wrapAsync(userDelete));

export default router;