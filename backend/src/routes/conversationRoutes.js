const express = require("express");
const controller = require("../controller/conversationController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { isAuthenticated } = require("../helpers/authMiddleware");

const route = express.Router();

// GET
route.get("/:id", controller.getConversation);
route.get("/private/:username", isAuthenticated, controller.getPrivateConversation);

// POST
route.post("/group", controller.createGroupConversation);
route.post("/:id", isAuthenticated, controller.sendMessage);
route.post("/image/:id", isAuthenticated, upload.single("file"), controller.sendImage);
route.post("/delete/:id", controller.deleteConversation);

module.exports = route;
