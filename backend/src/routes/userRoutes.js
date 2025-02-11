const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const controller = require("../controller/userController");
const passport = require("passport");
const { isAuthenticated } = require("../helpers/authMiddleware");

const route = express.Router();

// GET
route.get("/", isAuthenticated, controller.getUserData);

// POST
route.post("/", isAuthenticated, controller.changeUserStatus);
route.post("/sign-up", controller.signUp);
route.post("/log-in", passport.authenticate("local", { failureMessage: true }), controller.logIn);
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
route.post("/profile", isAuthenticated, upload.single("file"), controller.updateUser);
route.post("/add/:id", isAuthenticated, controller.addUser);
route.post("/accept/:id", isAuthenticated, controller.acceptUser);
route.post("/reject/:id", isAuthenticated, controller.rejectUser);
route.post("/remove/:id", isAuthenticated, controller.removeFriend);

module.exports = route;
