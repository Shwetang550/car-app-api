import express from "express";
import Joi from "joi";
import mongoose from "mongoose";

import logger from "./middleware/logger.js";
import authentication from "./middleware/authentication.js";

// routes
import cars from "./routes/cars.js";
import dealer from "./routes/dealers.js";
import cors from "cors"; //Setup CORS

const app = express();

// middleware for reading json from req-body
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: "X-Requested-With, Content-Type, auth-token",
  })
); //Add authentication token header

// custom middlewares
app.use(logger);
app.use(authentication);

// routes
app.use("/api/cars", cars);
app.use("/api/dealers", dealer);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening at ${port}...`));

// mongodb connection
// mongodb://localhost/car
// mongodb+srv://shwetang550:<password>@cluster0.cvy5qf8.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://shwetang550:shwetang550@cluster0.cvy5qf8.mongodb.net/TestDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("MongoDB Connection Error", err));
