import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv"; // For access Environment Variables
import restaurantsDAO from "./dao/restaurantsDAO.js";
import reviewsDAO from "./dao/reviewsDAO.js";

dotenv.config(); //  Loading .env file

// get Access to MongoDB Client
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;

//Connect to database
MongoClient.connect(process.env.RESTAURANT_DB_URI, {
  maxPoolSize: 10, //Maximum number of connections allowed
  wtimeoutMS: 2500, // 2500 ms timeout for write operations or request
  useNewUrlParser: true, // To avoid DeprecationWarning
})
  .catch((err) => {
    console.log("Error connecting to database: ", err);
    process.exit(1);
  })
  .then(async (client) => {
    // client is a pointer to the database
    await restaurantsDAO.injectDB(client); // Inject database connection
    await reviewsDAO.injectDB(client); // Inject database connection

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
