const express = require("express");
const carController = require("../controllers/carControllers");

const router = express.Router();

router.param("id", carController.checkId);

router.route("/").get(carController.getAllCars).post(carController.postCar);
router
  .route("/:id")
  .get(carController.getCarById)
  .put(carController.putCarById)
  .delete(carController.deleteCar);

module.exports = router;
