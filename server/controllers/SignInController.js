const User = require('../models/User');
const UserSession = require('../models/UserSession')

// Create new account
module.exports.register = (req, res) => {
		let { body } = req;
		let {
			email,
			password,
		} = body;

		if(!email) {
			return res.send({
				success: false,
				message: "Error: Email cannot be blank."
			});
		}
		if(!password) {
			return res.send({
				success: false,
				message: "Error: Password cannot be blank."
			});
		}
		email = email.toLowerCase();

		// Steps:
		// 1. Verify email doesn't already exist
		// 2. Save email in db

		User.find({ email: email }, (err, previousUsers) => {
			if(err) {
				return res.send({
					success: false,
					message: "Error: Server error. 34"
				});
			} else if (previousUsers.length > 0) {
				console.log("Previous Users:")
				console.log(previousUsers)
				return res.send({
					success: false,
					message: "Error: Account already exists."
				});
			}

			// Save the new user
			let newUser = new User();
			newUser.email = email;
			newUser.password = newUser.generateHash(password);
			newUser.save((err, user) => {
				if(err) {
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
	let { body } = req;
	let {
		email,
		password,
	} = body;

	if(!email) {
		return res.send({
			success: false,
			message: "Error: Email cannot be blank."
		});
	}
	if(!password) {
		return res.send({
			success: false,
			message: "Error: Password cannot be blank."
		});
	}

	email = email.toLowerCase();

	// check if password is valid
	User.find({
		email: email
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
	const { query } = req;
	const { token } = query;

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

		console.log('sessions.length: ', sessions.length);
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
	const { query } = req;
	const { token } = query;

	// /api/account/logout?="<token string here>"

	// Verify the token is unique and not marked to be deleted
	// then set session to be deleted
	UserSession.findOneAndUpdate({
		_id: token,
		isDeleted: false
	}, {
		$set: { isDeleted: true }
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
