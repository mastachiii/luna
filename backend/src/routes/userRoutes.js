const express = require("express");
const db = require("../model/userQueries");
const controller = require("../controller/userController");
const passport = require("passport");
const { isAuthenticated } = require("../helpers/authMiddleware");

const route = express.Router();

// GET
route.post("/log-out", isAuthenticated, (req, res, next) => {
    req.logout(err => {
        if (err) next(err);

        // Destroy session in db if user logs out...
        req.session.destroy(err => {
            if (err) next(err);

            return res.status(200).json({ message: "Logged out" });
        });
    });
});

// POST
route.post("/sign-up", controller.signUp);
route.post("/log-in", passport.authenticate("local", { failureMessage: true }), controller.logIn);
route.post("/add/:id", isAuthenticated, controller.addUser);
route.post("/accept/:id", isAuthenticated, controller.acceptUser);

module.exports = route;
