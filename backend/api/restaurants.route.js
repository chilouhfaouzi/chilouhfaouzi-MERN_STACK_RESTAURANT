import express from "express";
import RestaurantsController from "./restaurants.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();

// .../api/restaurants/
router.get("/", RestaurantsController.apiGetRestaurants);
router.get("/id/:id", RestaurantsController.apiGetRestaurantById);
router.get("/cuisines", RestaurantsController.apiGetCuisines);

router
  .route("/reviews")
  .post(ReviewsController.apiAddReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
