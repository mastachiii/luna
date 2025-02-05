const express = require("express");

const db = require("../model/userQueries");
const route = express.Router();

route.post("/sign-up", controller.signUp);

module.exports = route;
