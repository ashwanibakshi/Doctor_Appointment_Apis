const express       = require("express");
const router        = express.Router();

router.use("/user",         require("../routes/userRoutes"));
router.use("/doctor",       require("../routes/doctorRoutes"));
router.use("/appointment",  require("../routes/appointmentRoutes"));

module.exports = router;