// IMPORTS AT THE TOP
const express = require("express");
const Dog = require("./dog-model");

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get("/hello", (req, res) => {
  res.json({ message: "hello" });
});
// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get("/api/dogs", (req, res) => {
  // pull dogs from database
  Dog.findAll()
    .then((dogs) => {
      // send dogs back to client
      res.json(dogs);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "error getting all dogs", err: err.message });
    });
});

// server.get('/api/dogs', async (req, res) => {
//     try {
//         const dogs = await Dog.findAll()
//         res.json(dogs)
//     } catch (err) {
//         res.status(500).json({
//             message: 'something bad happened',
//             error: err.message
//         })
//     }
// })

// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get("/api/dogs/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      res.status(404).json({
        message: `dog by id ${req.params.id} does not exist`,
      });
    } else {
      res.json(dog);
    }
  } catch (err) {
    res.status(500).json({
      message: "error getting dog by id",
      error: err.message,
    });
  }
});
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post("/api/dogs", async (req, res) => {
  try {
    // pull dog info from req.body
    // send back to client the new dog
    if (!req.body.name || !req.body.weight) {
      res.status(400).json({
        message: "name and weight are required",
      });
    } else {
      // use Dog.create with req.body
      const newDog = await Dog.create(req.body);
      res.status(201).json(newDog);
    }
  } catch (err) {
    res.status(500).json({
      message: "error posting new dog",
      error: err.message,
    });
  }
});
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put("/api/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updated = await Dog.update(id, body);
    if (!updated) {
      res.status(404).json({
        message: `dog by id ${id} does not exists`,
      });
    } else {
      res.json(updated);
    }
  } catch (err) {
    res.status(500).json({
      message: "error updating existing dog",
      error: err.message,
    });
  }
});
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete("/api/dogs/:id",
  async (req, res) => {
    const { id } = req.params;
    Dog.delete(id)
      .then((deletedDog) => {
        if (!deletedDog) {
          res.status(404).json({
            message: `dog by id ${id} does not exists`,
          });
        } else {
          res.json(deletedDog);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "error deleting dog",
          error: err.message,
        });
      });
  });
// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;
