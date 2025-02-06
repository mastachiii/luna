const express = require("express");
const db = require("../model/userQueries");
const controller = require("../controller/userController");
const passport = require("passport");
const { isAuthenticated } = require("../helpers/authMiddleware");

const route = express.Router();

// GET
route.get("/log-out", isAuthenticated, (req, res) => {
    req.logout(err => {
        if (err) next(err);

        return res.status(200).json({ message: "Logged out" });
    });
});

// POST
route.post("/sign-up", controller.signUp);
route.post("/log-in", passport.authenticate("local", { failureMessage: true }, controller.logIn));

module.exports = route;
