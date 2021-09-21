const express        = require("express");
const router         = express.Router();
const patientController = require("../controllers/patientController");

router.get('/register',             patientController.getRegister);
router.post('/register',            patientController.postRegister);
router.get('/login',                patientController.getLogin);
router.post('/login',               patientController.postLogin);
router.get('/index',                patientController.index);

router.get('/profile/:id',          patientController.editPatientProfile);
router.put('/profile/update',       patientController.updatePatientProfile);
router.put('/update/status/:id',    patientController.updatePatientStatus);

module.exports = router;