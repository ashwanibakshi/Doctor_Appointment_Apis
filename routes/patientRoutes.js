const express        = require("express");
const router         = express.Router();
const patientController = require("../controllers/patientController");

router.get('/register',      patientController.getRegister);
router.post('/register',     patientController.postRegister);
router.get('/login',         patientController.getLogin);
router.post('/login',        patientController.postLogin);
router.get('/profile/:id',   patientController.editUserProfile);
router.put('/profile/update',patientController.updateUserProfile);

router.get('/index',         patientController.index);

module.exports = router;
