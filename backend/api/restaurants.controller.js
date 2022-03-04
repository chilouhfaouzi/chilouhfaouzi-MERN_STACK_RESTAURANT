import restaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    }
    if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    }
    if (req.query.name) {
      filters.name = req.query.name;
    }
    try {
      const { restaurantsList, totalNumRestaurants } =
        await restaurantsDAO.getRestaurants({
          filters,
          page,
          restaurantsPerPage,
        });
      res.json({
        restaurants: restaurantsList,
        total_results: totalNumRestaurants,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // get restaurant by id
  static async apiGetRestaurantById(req, res) {
    const restaurantId = req.params.id;
    console.log("Hello from api get by id: " + restaurantId);
    try {
      const restaurant = await restaurantsDAO.getRestaurantById(restaurantId);
      res.json(restaurant);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Get cuisines
  static async apiGetCuisines(req, res) {
    try {
      const cuisines = await restaurantsDAO.getCuisines();
      res.json(cuisines);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
