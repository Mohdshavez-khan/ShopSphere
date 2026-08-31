import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { adminProductCreate , adminProducts , adminProductUpdate , adminProductDelete } from "../controllers/adminProductController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { upload } from "../config/cloudinary.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { productValidate } from "../Schema.js";
import { createProductImage } from "../Schema.js";
const router = express.Router();

router.post("/" , isLoggedIn , isAdmin , upload.single("image") , validate(productValidate) , createProductImage, wrapAsync(adminProductCreate));
router.get("/" , isLoggedIn , isAdmin , wrapAsync(adminProducts));
router.put("/:id" ,  isLoggedIn , isAdmin ,  upload.single("image") ,validate(productValidate), wrapAsync(adminProductUpdate));
router.delete("/:id" ,  isLoggedIn , isAdmin , wrapAsync(adminProductDelete));
   


export default(router);