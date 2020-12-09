mongoose = require('mongoose');


const CalcHistorySchema = new mongoose.Schema({
	userId: {
		type: String,
		default: ''
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	carbTaxTonne: String,
	compRebuildCost: String,
	companyName: String,
	custName: String,
	date: String,
	drillTimePercent: String,
	dthBit: String,
	dthComp: String,
	dthHammer: String,
	dthWap: String,
	elevation: String,
	engineRebuildCost: String,
	estHours: String,
	fracturization: String,
	fuelCost: String,
	fuelTankSize: String,
	holeDepth: String,
	pipeSize: String,
	projName: String,
	rotBit: String,
	rotPulldown: String,
	rotRpm: String,
	temp: String,
	ucs: String	
});

module.exports = mongoose.model('CalcHistory', CalcHistorySchema);