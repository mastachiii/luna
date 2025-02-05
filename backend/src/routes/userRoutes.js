const express = require("express");
const db = require("../model/userQueries");
const controller = require("../controller/userController");

const route = express.Router();

route.post("/sign-up", controller.signUp);

module.exports = route;
