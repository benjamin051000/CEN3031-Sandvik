const SignInController = require('../controllers/SignInController');
const express = require('express');
const SignInRouter = express.Router();

// ALL REQUESTS TO THIS API USE "...path/api/account/..."

// post request to create new account
SignInRouter.post("/register", SignInController.register);
SignInRouter.post("/login", SignInController.login);
SignInRouter.get("/verify", SignInController.verify);
SignInRouter.get("/logout", SignInController.logout);

module.exports = SignInRouter;