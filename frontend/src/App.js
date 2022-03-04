import React from "react"; // Import React
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import AddReview from "./components/add-review";
import RestaurantReviews from "./components/restaurant-reviews";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null); // create a state variable for user, initial value is null

  async function login(user) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <header className="App-header navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          {/* color white logo */}
          <div className="logo">RestaurantsList</div>

          <ul className="navbar-nav mr-auto">
            <li className="av-item ">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="av-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<RestaurantsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurants/:id" element={<RestaurantReviews />} />
          <Route path="/restaurants/:id/reviews/new" element={<AddReview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
