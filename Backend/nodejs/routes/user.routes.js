const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');
const passport = require("passport");


require("../middleware/passport")(passport);
const needAuth = passport.authenticate("jwt", { session: false });

router.post('/auth',UserController.auth);

module.exports = router;