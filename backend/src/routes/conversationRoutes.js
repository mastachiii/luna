const express = require("express");
const controller = require("../controller/conversationController");

const route = express.Router();

// route.get("/:username", controller.getConversation);

route.post("/:id", controller.sendMessage);

module.exports = route;
