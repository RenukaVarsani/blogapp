const express = require("express");
const auth = require("../middleware/auth")
const UserController = require("../controller/user");
const passwordResetToken = require('../models/reset');
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.login);

router.post("/logout",auth, UserController.logout);

router.get("/getdata", UserController.getUserData);

router.get('/me', auth, UserController.getUser);

router.patch('/:id', UserController.updateUser) ;

router.get("/selected/:id" , UserController.getUserById);

router.delete('/:id', UserController.deleteUser);

router.post('/req-reset-password', UserController.postReset);

router.get('/new-password', UserController.getNewPassword);

router.post('/valid-password-token', UserController.postNewPassword);






module.exports = router;        