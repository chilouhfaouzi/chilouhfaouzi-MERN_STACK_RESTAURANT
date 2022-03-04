import React from "react"; // Import React
import { Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(props.restaurant);
  const [adress, setAdress] = useState("");

  useEffect(() => {
    setRestaurant(props.restaurant);
    setAdress(
      `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`
    );
  }, [props.restaurant]);
  return (
    <div className="restaurant-item list-group-item my-1">
      <Link to={`/restaurants/${restaurant._id}`}>
        <h3 className="restaurant-name">{restaurant.name}</h3>
      </Link>
      <div className="restaurant-cuisine my-2">
        <strong>Cuisine: </strong>
        {restaurant.cuisine}
      </div>
      <div className="restaurant-adress my-2">{adress}</div>
      <a
        target="_blank"
        href={"https://www.google.com/maps/place/" + adress}
        className="btn btn-primary btn-sm my-2"
      >
        View Map
      </a>
      {/* show reviews */}
      {/* <Link to={`/restaurants/${restaurant._id}`}>
        <div className="restaurant-reviews">
          <span className="reviews">reviews</span>
        </div>
      </Link> */}
    </div>
  );
}

export default Restaurant;
