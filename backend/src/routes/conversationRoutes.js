const express = require("express");
const controller = require("../controller/conversationController");

const route = express.Router();

// GET
route.get("/:id", controller.getConversation);

// POST
route.post("/group", controller.createGroupConversation);
route.post("/:id", controller.sendMessage);

module.exports = route;
