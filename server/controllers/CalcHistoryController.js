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
module.exports.create = async (req,res) => {
	const calcHist = req.body;
  if (!calcHist) {
    return res.send({
			success: false,
			message: "Error: History not found",
    });
  }
  await new CalcHistory(calcHist)
    .save()
    .then(res.send({
			success: true,
			message: "New history added."
		}))
    .catch((err) => {
      res.send({
				success: false,
				message: "Error: Server error",
			});
    });
}

// delete a calculation history from the db
module.exports.delete = async (req,res) => {
  let id = req.body._id;

  await CalcHistory.deleteOne({_id: id}, (err) => {
    if (err) {
      return res.status(200).send({
        error: err.message || "An unknown error occurred",
      });
    }
    res.send({
      error: id + " has been deleted successfully",
    });
  });
}

// get a user's history
module.exports.getUserHistory = async (req,res) => {
	console.log(req.params)
	let id = req.params.userId;

	await CalcHistory.find({ userId: id }, (err, data) => {
    if (err)
      return res.send({
				success: false,
        message: "Error: Server error",
			});
			
    return res.json(data);
  });
}

// update a calculation history
module.exports.update = async (req,res) => {
	const calcHist = req.body;
	const id = calcHist._id;
	if (!calcHist) {
		return res.send({
			success: false,
			message: "Error: History not found"
		});
	}

	await CalcHistory.updateOne({ _id: id }, calcHist)
	.then(res.send({
		success: true,
		message: "Updated document."
	}));
}