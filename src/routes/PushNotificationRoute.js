const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router();
const pushNotificationController = require("../controllers/PushNotificationController");

router.post("/sendNotification",pushNotificationController.createNotification);
/*
router.get("/sendNotification",pushNotificationController.sendNotification);
router.post("/sendNotificationToDevice",pushNotificationController.sendNotificationToSpecificDevice);
*/
module.exports = router;