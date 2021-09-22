const express       = require("express");
const router        = express.Router();

router.use("/patient",          require("../routes/patientRoutes"));
router.use("/doctor",           require("../routes/doctorRoutes"));
router.use("/appointment",      require("../routes/appointmentRoutes"));
router.use("/admin",            require("../routes/adminRoutes"));

module.exports = router;