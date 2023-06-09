const express = require("express");
const auth = require("../middleware/auth")
const UserController = require("../controller/user");
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login",   UserController.login);

router.post("/logout",auth, UserController.logout);

router.get("/getdata", auth ,  UserController.getUserData);

router.get('/me',  UserController.getUser);

router.patch('/:id', UserController.updateUser) ;

router.get("/selected/:id" , UserController.getUserById);

router.delete('/:id', UserController.deleteUser);

router.post('/req-reset-password', UserController.postReset);

router.get('/reset-password/:token', UserController.verifyToken);

router.post('/reset-password/:token', UserController.postNewPassword);

router.post('/token' , UserController.getRefreshToken);







module.exports = router;        