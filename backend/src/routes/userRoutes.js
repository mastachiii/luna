const express = require("express");
const db = require("../model/userQueries");
const controller = require("../controller/userController");
const passport = require("passport");

const route = express.Router();

// GET
route.get("/log-out", (req, res, next) => {
    req.logout(err => {
        if (err) next(err);

        res.status(200).json({ message: "Logged out" });
    });
});

// POST
route.post("/sign-up", controller.signUp);
route.post("/log-in", controller.validateLoginForm, passport.authenticate("local", { failWithError: true, failureMessage: true }), controller.logIn);

module.exports = route;