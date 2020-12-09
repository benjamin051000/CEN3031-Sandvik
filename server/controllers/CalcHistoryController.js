CalcHistory = require('../models/CalcHistoryModel');

/* model CalcHist object:
calcHist = {
	"userId": "123456",
	"isDeleted": "false",
	"carbTaxTonne": "sampletext",
	"compRebuildCost": "sampletext",
	"companyName": "sampletext",
	"custName": "sampletext",
	"date": "sampletext",
	"drillTimePercent": "sampletext",
	"dthBit": "sampletext",
	"dthComp": "sampletext",
	"dthHammer": "sampletext",
	"dthWap": "sampletext",
	"elevation": "sampletext",
	"engineRebuildCost": "sampletext",
	"estHours": "sampletext",
	"fracturization": "sampletext",
	"fuelCost": "sampletext",
	"fuelTankSize": "sampletext",
	"holeDepth": "sampletext",
	"pipeSize": "sampletext",
	"projName": "sampletext",
	"rotBit": "sampletext",
	"rotPulldown": "sampletext",
	"rotRpm": "sampletext",
	"temp": "sampletext",
	"ucs": "sampletext"
}
*/

// add a new calculation history to the db
module.exports.create = async (req, res) => {
	const userId = req.body.userId;
	let calcHist = req.body;

	if (!calcHist || !userId) {
		return res.send({
			success: false,
			message: "Error: Invalid",
		});
	}

	// check if user exists in db
	CalcHistory.find({
		userId: userId
	}, (err, users) => {
		if (err) {
			return res.send({
				success: false,
				message: "Error: Server error 53"
			});
		}

		// validate against CalcHistory schema
		newUserCalcHist = new CalcHistory(calcHist);
		let error = newUserCalcHist.validateSync();
		if (error) {
			return res.send({
				success: false,
				message: `Server error: ${error._message}`
			});
		} else if (users.length != 1) {
			// user isnt in db yet
			calcHist.save((err) => {
				if (err) {
					return res.send({
						success: false,
						message: "Error: Server error 71"
					});
				} else {
					return res.send({
						success: true,
						message: "New user's history created."
					});
				}
			});
		} else {
			// otherwise, the user already exists, so just update their history
			CalcHistory.updateOne({
				userId: userId
			}, calcHist, (err) => {
				if (err) {
					return res.send({
						success: false,
						message: `Error: ${err}`
					});
				} else {
					// if we got here the everything is good to go
					return res.send({
						success: true,
						message: "Existing user's history updated!"
					});
				}
			})
		}
	})
}

// // delete a calculation history from the db
// module.exports.delete = async (req,res) => {
//   let id = req.body._id;

//   await CalcHistory.deleteOne({_id: id}, (err) => {
//     if (err) {
//       return res.status(200).send({
//         error: err.message || "An unknown error occurred",
//       });
//     }
//     res.send({
//       error: id + " has been deleted successfully",
//     });
//   });
// }

// get a user's history

module.exports.getUserHistory = async (req, res) => {
	let id = req.params.userId;

	await CalcHistory.find({
		userId: id
	}, (err, data) => {
		if (err)
			return res.send({
				success: false,
				message: "Error: Server error",
			});

		return res.json(data);
	});
}

// update a calculation history
// module.exports.update = async (req,res) => {
// 	const calcHist = req.body;
// 	const id = calcHist._id;
// 	if (!calcHist) {
// 		return res.send({
// 			success: false,
// 			message: "Error: History not found"
// 		});
// 	}

// 	await CalcHistory.updateOne({ _id: id }, calcHist)
// 	.then(res.send({
// 		success: true,
// 		message: "Updated document."
// 	}));
// }

//========== Sample CalcHistory Object ===========//

// {
// 	"userId": "employee",
// 	"userHistory": [{
// 			"carbTaxTonne": "3",
// 			"compRebuildCost": "3",
// 			"companyName": "sampledata",
// 			"custName": "sampledata",
// 			"date": "sampledata",
// 			"drillTimePercent": "3",
// 			"dthBit": "3",
// 			"dthComp": "3",
// 			"dthHammer": "sampledata",
// 			"dthWap": "3",
// 			"elevation": "3",
// 			"engineRebuildCost": "3",
// 			"estHours": "3",
// 			"fracturization": "sampledata",
// 			"fuelCost": "3",
// 			"fuelTankSize": "3",
// 			"holeDepth": "3",
// 			"itemId": "3",
// 			"pipeSize": "3",
// 			"projName": "sampledata",
// 			"rotBit": "3",
// 			"rotPulldown": "3",
// 			"rotRpm": "3",
// 			"temp": "3",
// 			"ucs": "3"    }]    
// }