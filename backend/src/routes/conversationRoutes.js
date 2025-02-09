const express = require("express");
const controller = require("../controller/conversationController");
const { isAuthenticated } = require("../helpers/authMiddleware");

const route = express.Router();

// GET
route.get("/:id", controller.getConversation);
route.get("/private/:username", isAuthenticated, controller.getPrivateConversation);

// POST
route.post("/group", controller.createGroupConversation);
route.post("/delete/:id", controller.deleteConversation);
route.post("/:id", controller.sendMessage);

module.exports = route;
