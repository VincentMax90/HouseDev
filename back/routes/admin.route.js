const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin.controller");



adminRouter.post("/submit",  adminController.submitProperty);

adminRouter.put("/property/edit/:id",adminController.editProperty);

adminRouter.delete("/property/delete/:id",adminController.deleteProperty);

adminRouter.get("/allUser",adminController.getAllUser)

adminRouter.delete("/user/delete/:id" , adminController.userDelete)

module.exports = adminRouter;