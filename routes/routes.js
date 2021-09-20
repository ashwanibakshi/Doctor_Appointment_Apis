const express       = require("express");
const router        = express.Router();

router.use("/patient",      require("../routes/patientRoutes"));
router.use("/doctor",       require("../routes/doctorRoutes"));
router.use("/appointment",  require("../routes/appointmentRoutes"));

module.exports = router;