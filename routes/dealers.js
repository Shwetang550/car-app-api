import express from "express";
import Joi from "joi";
const router = express.Router();

// dummyData
import mongoose from "mongoose";

// schema
const dealerSchema = mongoose.Schema({
  name: String,
  wishlisted: Boolean,
  certified: Boolean,
});

const Dealer = mongoose.model("Dealer", dealerSchema);

// dealers list
router.get("/", async (req, res) => {
  const dealersList = await Dealer?.find();

  res.send(dealersList);
});

// dealer details
router.get("/:id", async (req, res) => {
  const dealer = await Dealer.findById(req.params.id);

  if (!dealer) {
    res.status(404).send("dealer with the given ID not found!");
    return;
  }

  res.send(dealer);
});

// adding dealer to the cars-list
router.post("/", async (req, res) => {
  const dealer = new Dealer({
    name: req.body.name,
    wishlisted: req.body.wishlisted,
    certified: req.body.certified,
  });

  const resultDealer = await dealer.save();
  res.send(resultDealer);
});

// updating dealer
router.put("/:id", async (req, res) => {
  const dealer = await Dealer.findById(req.params.id);
  dealer.set({
    name: req.body.name,
    wishlisted: req.body.wishlisted,
    certified: req.body.certified,
  });

  await dealer.save();
  res.send(dealer);
});

// deleting car
router.delete("/:id", async (req, res) => {
  const deleted_dealer = await Dealer.findByIdAndRemove(req.params.id);
  res.send(deleted_dealer);
});

export default router;
