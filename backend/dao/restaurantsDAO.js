import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let restaurants;

export default class RestaurantsDAO {
  static async injectDB(conn) {
    // Inject database connection
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTARANT_NAME_DB)
        .collection("restaurants");
    } catch (err) {
      console.error(
        "Unable to establish connection handle in RestaurantsDAO: " + err
      );
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    //initialising the query
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    //making the request to database
    let cursor;

    try {
      cursor = await restaurants.find(query); // a curson is a pointer to the data
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    // Divide the result to page : make pagination of the result
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  // get restaurants by id and reviews with pipeLine
  static async getRestaurantById(restaurantId) {
    // Pipeline to get the restaurant and the reviews
    const pipeline = [
      {
        $match: {
          _id: ObjectId(restaurantId),
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "restaurant_id",
          as: "reviews",
        },
      },
    ];
    try {
      const restaurant = await restaurants.aggregate(pipeline).next(); // return the next item
      return restaurant;
    } catch (e) {
      console.error(`Unable to get restaurant by id, ${e}`);
      return {};
    }
  }

  // Get cuisines
  static async getCuisines() {
    try {
      const cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return [];
    }
  }
}
