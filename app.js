import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/car")
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.log("connection error...", err));

const carSchema = mongoose.Schema({
  name: { type: String, required: true },
  make_year: { type: Number, required: true },
});

const Car = mongoose.model("Car", carSchema);

// create data
const createDB = async () => {
  const car = new Car({
    name: "Tata Nexon",
    make_year: 2020,
  });

  const result = await car.save();
  console.log(result);
};

// getting data
const getDB = async () => {
  const result = await Car?.find().sort({ year: 1 });

  console.log(result);
};

// update data
const updateDB = async (id) => {
  const car = await Car.findById(id);

  car.set({
    name: "Maruti Alto 800",
  });

  const result = await car.save();
  console.log(result);
};

// delete data
const deleteDB = async (id) => {
  const result = await Car.findByIdAndRemove(id);
  console.log(result);
};

// createDB();
getDB();
// updateDB("6533a2cfd5369d1c41860a51");
// deleteDB("6533a2cfd5369d1c41860a51");
