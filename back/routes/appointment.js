const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointment.controller");



appointmentRouter.post("/submit", appointmentController.submitAppointment);

appointmentRouter.put("/edit/:id",appointmentController.editAppointment);

appointmentRouter.delete("/delete/:id",appointmentController.deleteAppointment);

appointmentRouter.get("/searchAll",appointmentController.searchAll)

appointmentRouter.get("/user/:id",appointmentController.searchUserId)


module.exports = appointmentRouter;