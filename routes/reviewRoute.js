import express from "express";
import { createReview , deleteReview, showReview , updateReview} from "../controllers/review.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { reviewValidate } from "../Schema.js"
const router = express.Router();

router.post("/:productId/reviews", isLoggedIn, validate(reviewValidate), wrapAsync(createReview));
router.get("/:productId/reviews", isLoggedIn, wrapAsync(showReview));
router.put("/:reviewId/reviews", isLoggedIn, wrapAsync(updateReview));
router.delete("/:reviewId/reviews", isLoggedIn, wrapAsync(deleteReview));


export default router;