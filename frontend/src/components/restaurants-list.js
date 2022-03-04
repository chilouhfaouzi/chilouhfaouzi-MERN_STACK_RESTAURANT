import React, { useState, useEffect } from "react"; // Import React
import restaurantService from "../services/restaurant-service";
import { Link } from "react-router-dom";
import Restaurant from "./restaurant";

function RestaurantsList(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  // get All restaurants
  const retrieveRestaurants = () => {
    restaurantService.getAll().then((res) => {
      console.log(res.data);
      setRestaurants(res.data.restaurants);
    });
  };

  // get All Cuisines
  const retrieveCuisines = () => {
    restaurantService.getCuisines().then((res) => {
      console.log(res.data);
      setCuisines(res.data);
    });
  };

  // search by name
  const searchByName = (e) => {
    // e is the event
    setSearchName(e.target.value); // target is the input field
  };

  // search by zipcode
  const searchByZip = (e) => {
    setSearchZip(e.target.value); // target is the input field
  };

  // search by cuisine
  const searchByCuisine = (e) => {
    setSearchCuisine(e.target.value);
  };

  // Refresh the list of restaurants
  const refreshList = () => {
    retrieveRestaurants();
  };

  // find methode
  const find = (query, by) => {
    restaurantService.find(query, by).then((res) => {
      console.log(res.data);
      setRestaurants(res.data.restaurants);
    });
  };

  // find by name
  const findByName = () => {
    console.log("findByName component");
    find(searchName, "name");
  };

  // find by zip
  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  // find by cuisine
  const findByCuisine = () => {
    find(searchCuisine, "cuisine");
  };

  // Component
  return (
    <div className="restaurants-list">
      <div className="container">
        <h3 className="text-center my-3">Search Restaurant</h3>
        <div class="form-group">
          <div className="searchByName">
            <input
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={searchByName}
              class="form-control"
            />
            <button
              type="button"
              onClick={findByName}
              className="btn btn-primary my-2"
            >
              Search
            </button>
          </div>
          <div className="searchByZip my-2">
            <input
              type="text"
              placeholder="Search by Zip"
              value={searchZip}
              onChange={searchByZip}
              class="form-control"
            />
            <button
              type="button"
              onClick={findByZip}
              className="btn btn-primary my-2"
            >
              Search
            </button>
          </div>
          <div className="searchByCuisin my-2 input-group">
            <select onChange={searchByCuisine} className="form-control">
              {cuisines.map((cuisine) => {
                return (
                  <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                );
              })}
            </select>
          </div>
          <button
            type="button"
            onClick={findByCuisine}
            className="btn btn-primary my-2"
          >
            Search
          </button>
        </div>
      </div>
      <div className="list-restaurants list-group mt-3">
        {restaurants.map((restaurant) => (
          <Restaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantsList;
