const fs = require("fs");

const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

// b
const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      cars,
    },
  });
};

// c
const getCarById = (req, res) => {
  const id = req.params.id;
  const car = cars.find((el) => el.id === id);

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `Data with ID ${id} is not found`,
    });
  }

  //   res.json(cars);

  res.status(200).json({
    status: "Success",
    data: {
      cars,
    },
  });
};

// d
const postCar = (req, res) => {
  console.log(req.body.role);
  const newCarId = cars[cars.length - 1]._id + 1;
  const newData = Object.assign(
    {
      id: newCarId,
    },
    req.body
  );

  cars.push(newData);
  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      // 201 -> created
      res.status(201).json({
        status: "succes",
        data: {
          car: newData,
        },
      });
    }
  );
};

// e
const putCarById = (req, res) => {
  const id = req.params.id;
  const updateCar = req.body;

  const carIndex = cars.find((el) => el.id === id);

  if (!carIndex) {
    return res.status(404).json({
      status: "failed",
      message: `Car with ID ${id} is not found`,
    });
  }

  cars[carIndex] = { ...cars[carIndex], ...updateCar };

  res.json(cars[carIndex]);

  res.status(200).json({
    status: "Success",
    data: {
      cars,
      car: cars[carIndex],
    },
  });
};

// f
const deleteCar = (req, res) => {
  const id = req.params.id;
  const carIndex = cars.find((el) => el.id === id);

  if (carIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `Car with ID ${id} is Invalid`,
    });
  }

  cars.splice(carIndex, 1);

  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `Car with ID ${id} has been deleted`,
        data: null,
      });
    }
  );
};

const checkId = (req, res, next, val) => {
  const car = cars.find((el) => el.id === val);

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `Car with ID ${val} is not found`,
    });
  }

  next();
};

module.exports = {
  getAllCars,
  getCarById,
  postCar,
  putCarById,
  deleteCar,
  checkId,
};
