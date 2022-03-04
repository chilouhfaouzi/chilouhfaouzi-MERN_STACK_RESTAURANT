import http from "../http-commun";

class RestaurantService {
  getAll(page = 0, restaurantsPerPage = 20) {
    return http.get(`?page=${page}&restaurantsPerPage=${restaurantsPerPage}`);
  }
  get(id) {
    console.log(http.get(`/id/${id}`));
    return http.get(`id/${id}`);
  }
  find(query, by = "", page = 0) {
    const queryString = `/?${by}=${query}&page=${page}/`;
    console.log(queryString);
    const result = http.get(queryString);
    console.log("result from service: ");
    return result;
  }

  createReview(data) {
    return http.post(`reviews`, data);
  }
  updateReview(data) {
    return http.put(`reviews`, data);
  }
  deleteReview(id) {
    return http.delete(`/reviews/${id}`);
  }
  getCuisines() {
    return http.get("/cuisines");
  }
}

export default new RestaurantService();
