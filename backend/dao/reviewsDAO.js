import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let reviews;
export default class ReviewsDAO {
  static async injectDB(conn) {
    // Inject database connection
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.RESTARANT_NAME_DB)
        .collection("reviews");
    } catch (err) {
      console.error(
        "Unable to establish connection handle in ReviewsDAO: " + err
      );
    }
  }

  // Add new reviews to the database
  static async addReview(restaurantId, review, userInfo, date) {
    console.log("hello from addReviewDAO");
    console.log(reviews);
    try {
      const reviewResponse = await reviews.insertOne({
        review: review,
        user_id: userInfo.user_id,
        date: date,
        restaurant_id: ObjectId(restaurantId),
      });
      return reviewResponse;
    } catch (err) {
      console.error(`Unable to add review, ${err}`);
      return {
        error: "Unable to add review",
      };
    }
  }

  // Update review
  static async updateReview(review, reviewId, user_id, date) {
    try {
      const reviewResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId), user_id: user_id },
        { $set: { review: review, date: date } }
      );
      return reviewResponse;
    } catch (err) {
      console.error(`Unable to update review, ${err}`);
      return {
        error: "Unable to update review",
      };
    }
  }

  // Delete review
  static async deleteReview(reviewId, user_id) {
    try {
      const reviewResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: user_id,
      });
      return reviewResponse;
    } catch (err) {
      console.error(`Unable to delete review, ${err}`);
      return {
        error: "Unable to delete review",
      };
    }
  }
}
