import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiAddReview(req, res) {
    console.log("hello from api");
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        user_id: req.body.user_id,
        user_name: req.body.user_name,
      };
      const date = new Date();
      const reviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        review,
        userInfo,
        date
      );
      res.status(200).send(reviewResponse);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Update review
  static async apiUpdateReview(req, res) {
    console.log("hello from api: Update");
    try {
      const review = req.body.text;
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        review,
        reviewId,
        userId,
        date
      );
      res.status(200).send(reviewResponse);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //delete review
  static async apiDeleteReview(req, res) {
    console.log("hello from api: Delete");
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      res.status(200).send(reviewResponse);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
