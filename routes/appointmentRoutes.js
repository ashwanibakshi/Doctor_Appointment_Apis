const express         = require("express");
const router          = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get('/book',     appointmentController.bookingPage)
router.post('/book',    appointmentController.booking);
router.post('/fetch',   appointmentController.fetch);

module.exports = router;