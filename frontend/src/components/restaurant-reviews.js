import React from "react"; // Import React
import { Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import restaurantService from "../services/restaurant-service";
import { useParams } from "react-router-dom";

function RestaurantReviews(props) {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  // get id by params
  const { id } = useParams();
  //    GET RESTAURANT BY _id
  useEffect(() => {
    console.log(id);
    console.log("hello from useEffect");
    restaurantService.get(id).then((res) => {
      console.log(res.data);
      setRestaurant(res.data);
    });
  }, [id]);

  return (
    <div className="container">
      <h1>Restaurant Reviews</h1>
      <p>This is the Restaurant Reviews page</p>
      <p>{restaurant.name}</p>
      <div className="restaurant-reviews">
        <span className="reviews">reviews</span>
        {/* show review */}
        {restaurant.reviews.map((review, index) => (
          <div key={index}>
            <p>{review.text}</p>
            <p>{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantReviews;
