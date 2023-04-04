const express = require("express");
const auth = require("../middleware/auth")
const UserController = require("../controller/user");
const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.login);

router.post("/logout",auth, UserController.logout);

router.get("/getdata", UserController.getUserData);

router.get('/me', auth, UserController.getUser);

router.patch('/', auth, UserController.updateUser) ;

router.delete('/', auth, UserController.deleteUser);

module.exports = router;        