import express from "express";
import Joi from "joi";
const router = express.Router();

// dummyData
import cars from "../dummyData.js";
import mongoose from "mongoose";

// schema
const carSchema = mongoose.Schema({
  name: String,
  model_name: String,
  make_year: Number,
  description: String,
  number_of_owners: Number,
  fuel_type: String,
  engine_type: String,
  km_driven: Number,
  image_url: String,
  car_price: Number,
  number_plate: String,
  share_url: String,
});

const Car = mongoose.model("Car", carSchema);

// cars list
router.get("/", async (req, res) => {
  const carsList = await Car?.find();

  res.send(carsList);
});

// single car with the given id
router.get("/:id", async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    res.status(404).send("Car with the given ID not found!");
    return;
  }

  res.send(car);
});

// adding car to the cars-list
router.post("/", async (req, res) => {
  // const result = validateCourse(req.body);

  // if (result.error) {
  //   res.status(400).send(result.error?.details[0].message);
  //   return;
  // }

  const car = new Car({
    name: req.body.name,
    make_year: req.body.make_year,
    model_name: req.body.model_name,
    description: req.body.description,
    number_of_owners: req.body.number_of_owners,
    fuel_type: req.body.fuel_type,
    engine_type: req.body.engine_type,
    km_driven: req.body.km_driven,
    image_url: req.body.image_url,
    car_price: req.body.price,
    number_plate: req.body.number_plate,
    share_url: req.body.share_url,
  });

  const resultCar = await car.save();
  res.send(resultCar);
});

// updating car
router.put("/:id", async (req, res) => {
  // lookup the car in the list
  // if not present, status code 404
  // const car = cars.find((i) => i.id === parseInt(req.params.id));

  // if (!car) {
  //   res.status(404).send("Car with the given Id not found!");
  //   return;
  // }

  // validate the car
  // if invalid data-entry, status code 400
  // const result = validateCourse(req.body);

  // if (result.error) {
  //   res.status(400).send(result.error?.details[0].message);
  //   return;
  // }

  // update the car
  // send the updated car
  // car.model = req.body.model;
  // res.send(car);

  const car = await Car.findById(req.params.id);
  car.set({
    name: req.body.name,
    make_year: req.body.make_year,
    model_name: req.body.model_name,
    description: req.body.description,
    number_of_owners: req.body.number_of_owners,
    fuel_type: req.body.fuel_type,
    engine_type: req.body.engine_type,
    km_driven: req.body.km_driven,
    image_url: req.body.image_url,
    car_price: req.body.price,
    number_plate: req.body.number_plate,
    share_url: req.body.share_url,
  });

  await car.save();
  res.send(car);
});

const validateCourse = (carObject) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    make_year: Joi.number(),
  });

  return schema.validate(carObject);
};

// deleting car
router.delete("/:id", async (req, res) => {
  // lookup the car in list
  // if does not exist, status code 404
  // const car = await Car.find((i) => i.id === parseInt(req.params.id));

  // if (!car) {
  //   res.status(404).send("Car with the given ID not found!");
  //   return;
  // }

  // delete
  // return deleted car
  // const index = cars.indexOf(car);
  // cars.splice(index, 1);

  const deleted_car = await Car.findByIdAndRemove(req.params.id);
  res.send(deleted_car);
});

export default router;
