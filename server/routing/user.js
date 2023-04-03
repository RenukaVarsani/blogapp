const express = require("express");
const auth = require("../middleware/auth")
const UserController = require("../controller/user");
const router = express.Router();

router.post("/users/signup", UserController.createUser);

router.post("/users/login",auth, UserController.login);

router.post("/users/logout",auth, UserController.logout);

router.post("/users/getdata",auth, UserController.getUserData);

router.get('/users/me', auth, UserController.getUser);

router.patch('/users/me', auth, UserController.updateUser) ;

router.delete('/users/me', auth, UserController.deleteUser);

router.post('/users/reset' , auth , UserController.postReset);

router.get('/users/resetpassword' , auth , UserController.getNewPassword);

router.post('/users/postpassword' , auth , UserController.postNewPassword);






module.exports = router;    