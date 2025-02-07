const express = require("express");
const controller = require("../controller/conversationController");

const route = express.Router();

// GET
route.get("/:id", controller.getConversation);

// POST
route.post("/:id", controller.sendMessage);
route.post("/group", controller.createGroupConversation);

module.exports = route;
