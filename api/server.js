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
        .json({ message: "something bad happen", err: err.message });
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
server.get("/api/dogs");
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server;
