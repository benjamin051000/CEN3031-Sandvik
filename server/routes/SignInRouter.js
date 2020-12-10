const SignInController = require('../controllers/SignInController');
const express = require('express');
const SignInRouter = express.Router();

// ALL REQUESTS TO THIS API USE "...path/api/account/..."

// post request to create new account
SignInRouter.post("/register", SignInController.register);

// log in to an account
SignInRouter.post("/login", SignInController.login);

// check if a user is logged in
SignInRouter.get("/verify", SignInController.verify);

// log a user out
SignInRouter.get("/logout", SignInController.logout);

// update a user's role ( user <--> admin )
SignInRouter.put("/changerole", SignInController.changeRole);

// change a user's username
SignInRouter.put("/changeuser", SignInController.changeUsername);

// change a user's password
SignInRouter.put("/changepass", SignInController.changePassword);

module.exports = SignInRouter;