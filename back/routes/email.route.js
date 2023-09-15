const express = require("express");
const emailRouter = express.Router();
const emailController = require("../controllers/email.controller");

emailRouter.post("/", emailController.sendEmail);
emailRouter.post("/confirm", emailController.sendEmailConfirm);
emailRouter.post("/reject", emailController.sendEmailReject);

module.exports = emailRouter;
