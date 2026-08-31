import express from "express";
const router = express.Router();
import { getAllProduct, showProduct } from "../controllers/productController.js";
import { wrapAsync } from "../utils/wrapAsync.js";

router.route("/")
    .get(wrapAsync(getAllProduct))
    
router.route("/:id")
    .get(wrapAsync(showProduct))
   
export default router;
