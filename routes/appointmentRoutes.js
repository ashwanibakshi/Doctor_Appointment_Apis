const express         = require("express");
const router          = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post('/book',appointmentController.booking);
router.post('/fetch',appointmentController.fetch);

module.exports = router;