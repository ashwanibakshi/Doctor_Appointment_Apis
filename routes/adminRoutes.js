const express               = require("express");
const patientController     = require("../controllers/patientController");
const doctorController      = require("../controllers/doctorController");
const router                = express.Router();


router.get('/showall/patient',patientController.showAllPatient);
router.put('/patient/status/update/:id',patientController.updatePatientStatus);


//-------------- doctor ----------------//

router.put("/update/status/:id",    doctorController.updateStatus);
//------------- ends ------------------//


module.exports = router;