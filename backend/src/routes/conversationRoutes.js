const express = require("express");
const controller = require("../controller/conversationController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { isAuthenticated } = require("../helpers/authMiddleware");
const { uploadFile: uploadToSupabase } = require("../helpers/uploadSupabase");

const route = express.Router();

// GET
route.get("/:id", controller.getConversation);
route.get("/private/:username", isAuthenticated, controller.getPrivateConversation);

// POST
route.post("/group", isAuthenticated, upload.single("file"), uploadToSupabase, controller.createGroupConversation);
route.post("/:id", isAuthenticated, controller.sendMessage);
route.post("/group/:id", isAuthenticated, upload.single("file"), uploadToSupabase, controller.updateGroupConversation);
route.post("/image/:id", isAuthenticated, upload.single("file"), uploadToSupabase, controller.sendImage);
route.post("/delete/:id", controller.deleteConversation);
route.post("/group/add/:id", isAuthenticated, controller.addUser);
route.post("/group/remove/:id", isAuthenticated, controller.kickUser);
route.post("/group/leave/:id", isAuthenticated, controller.leaveConversation);
route.post("/group/delete/:id", isAuthenticated, controller.deleteConversation);
route.post("/delete/message/:id", isAuthenticated, controller.deleteMessage)

module.exports = route;
