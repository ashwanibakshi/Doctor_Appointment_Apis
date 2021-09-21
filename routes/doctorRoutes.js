const express           = require("express");
const router            = express.Router();
const doctorController  = require("../controllers/doctorController");


router.post("/add",             doctorController.addDoctor);
router.get("/profile/edit/:id", doctorController.editDoctor);
router.put("/profile/update",   doctorController.updateProfile);
router.put("/update/status/:id",    doctorController.updateStatus);

module.exports = router;