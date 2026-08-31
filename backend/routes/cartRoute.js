import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { addToCart, getCart , updateCart, removeCart , clearCart} from "../controllers/cartController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { cartValidate } from "../Schema.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/addTocart/:productId", isLoggedIn, validate(cartValidate) , wrapAsync(addToCart));
router.get("/", isLoggedIn, wrapAsync(getCart));
router.put("/updateCart/:productId" , isLoggedIn, wrapAsync(updateCart));
router.delete("/removeCart/:productId" , isLoggedIn, wrapAsync(removeCart));
router.delete("/" , isLoggedIn, wrapAsync(clearCart));

export default router;