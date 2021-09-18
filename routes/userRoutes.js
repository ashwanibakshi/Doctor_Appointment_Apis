const express        = require("express");
const router         = express.Router();
const userController = require("../controllers/userController");

router.get('/register');
router.post('/register', userController.postRegister);
router.get('/login');
router.post('/login', userController.postLogin);
router.get('/profile/:id', userController.editUserProfile);
router.put('/profile/update',userController.updateUserProfile);

module.exports = router;
