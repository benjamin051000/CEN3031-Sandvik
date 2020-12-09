const User = require('../models/UserModel');
const UserSession = require('../models/UserSessionModel')

// Create new account
module.exports.register = (req, res) => {
	let {
		body
	} = req;
	let {
		username,
		password,
	} = body;

	if (!username) {
		return res.send({
			success: false,
			message: "Error: username cannot be blank."
		});
	}
	if (!password) {
		return res.send({
			success: false,
			message: "Error: Password cannot be blank."
		});
	}
	username = username.toLowerCase();

	// Steps:
	// 1. Verify username doesn't already exist
	// 2. Save username in db

	User.find({
		username: username
	}, (err, previousUsers) => {
		if (err) {
			return res.send({
				success: false,
				message: "Error: Server error. 34"
			});
		} else if (previousUsers.length > 0) {
			// console.log("Previous Users:")
			// console.log(previousUsers)
			return res.send({
				success: false,
				message: "Error: Account already exists."
			});
		}

		// Save the new user
		let newUser = new User();
		newUser.username = username;
		newUser.password = newUser.generateHash(password);
		newUser.save((err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: "Error: Server error. 53"
				});
			}
			return res.send({
				success: true,
				message: 'Signed up successfully'
			});
		})
	})
};
// Sign In
module.exports.login = (req, res) => {
	let {
		body
	} = req;
	let {
		username,
		password,
	} = body;

	if (!username) {
		return res.send({
			success: false,
			message: "Error: username cannot be blank."
		});
	}
	if (!password) {
		return res.send({
			success: false,
			message: "Error: Password cannot be blank."
		});
	}

	username = username.toLowerCase();

	// check if password is valid
	User.find({
		username: username
	}, (err, users) => {
		if (err) {
			return res.send({
				success: false,
				message: 'Error: Server error 94.'
			});
		}

		if (users.length != 1) {
			return res.send({
				success: false,
				message: 'Error: Invalid 101.'
			});
		}

		const user = users[0];

		// if password isnt correct, error
		if (!user.validPassword(password)) {
			return res.send({
				success: false,
				message: 'Error: Incorrect Password.'
			});
		}

		// otherwise create user session
		const userSession = new UserSession();
		userSession.userId = user._id;
		userSession.save((err, doc) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error 122.'
				});
			}

			return res.send({
				success: true,
				message: 'Valid sign in',
				token: doc._id
			})
		})

	});
}
// Verify user
module.exports.verify = (req, res) => {
	// Get the token
	const {
		query
	} = req;
	const {
		token
	} = query;

	// /api/account/verify?="<token string here>"

	// Verify the token is unique and not marked to be deleted
	UserSession.find({
		_id: token,
		isDeleted: false
	}, (err, sessions) => {
		if (err) {
			return res.send({
				success: false,
				message: "Server Error"
			});
		}

		// console.log('sessions.length: ', sessions.length);
		if (sessions.length != 1) {
			return res.send({
				success: false,
				message: "Server Error: Invalid token 157"
			});
		}

		return res.send({
			success: true,
			message: "User verified"
		});
	})
}
// Log out
module.exports.logout = (req, res) => {
	// Get the token
	const {
		query
	} = req;
	const {
		token
	} = query;

	// /api/account/logout?="<token string here>"

	// Verify the token is unique and not marked to be deleted
	// then set session to be deleted
	UserSession.findOneAndUpdate({
		_id: token,
		isDeleted: false
	}, {
		$set: {
			isDeleted: true
		}
	}, null, (err, sessions) => {
		if (err) {
			return res.send({
				success: false,
				message: "Server Error"
			});
		}

		return res.send({
			success: true,
			message: "User logged out"
		});
	})
}
// update a user's "isAdmin" property
module.exports.changeRole = async (req, res) => {
	// change the role of a user by username
	const {
		username,
		isAdmin
	} = req.body;
	if (!username || !isAdmin) {
		return res.send({
			success: false,
			message: "Error: Invalid"
		});
	}

	User.updateOne({
		username: username
	}, {
		$set: {
			isAdmin: isAdmin
		}
	}, (err) => {
		if (err) {
			res.send({
				success: false,
				message: "Error: server error"
			});
		}
		res.send({
			success: true,
			message: `Updated role of ${username}`
		});
	});
}
// change a user's username
module.exports.changeUsername = async (req, res) => {
	let oldUsername = req.body.oldUsername;
	let newUsername = req.body.newUsername;

	// check that they provided input in body
	if (!oldUsername || !newUsername) {
		return res.send({
			success: false,
			message: "Error: Invalid"
		});
	}

	// normalize
	oldUsername = oldUsername.toLowerCase();
	newUsername = newUsername.toLowerCase();

	// update the username
	const response = await User.updateOne({username: oldUsername}, {username: newUsername},
		(err) => {
			if (err) {
				return res.send({
					success: false,
					message: "Error: server error"
				});
			}
		});

	return res.send({
		success: true,
		message: "Username changed"
	});
}
// change a user's password
module.exports.changePassword = async (req, res) => {
	let username = req.body.username;
	let oldPassword = req.body.oldPassword;
	let newPassword = req.body.newPassword;

	// check that they provided input in body
	if (!username || !oldPassword || !newPassword) {
		return res.send({
			success: false,
			message: "Error: Invalid"
		});
	}

	// normalize
	username = username.toLowerCase();

	// find the user with this username
	User.find({
		username: username
	}, (err, users) => {
		if (err) {
			return res.send({
				success: false,
				message: 'Error: Server error.'
			});
		}

		if (users.length != 1) {
			return res.send({
				success: false,
				message: 'Error: Invalid.'
			});
		}

		const user = users[0];

		// if password isnt correct, error
		if (!user.validPassword(oldPassword)) {
			return res.send({
				success: false,
				message: 'Error: Incorrect Password.'
			});
		}

		// encrypt new pass
		newPassword = user.generateHash(newPassword);

		// else, update the password
		User.updateOne({
				username: username
			}, {
				$set: {
					password: newPassword
				}
			},
			(err) => {
				if (err) {
					res.send({
						success: false,
						message: "Error: server error"
					});
				}
				res.send({
					success: true,
					message: "Updated password"
				});
			});
	})
}