mongoose = require('mongoose');

const CalcHistorySchema = new mongoose.Schema({
	userId: {
		type: String,
		default: ''
	},
	userHistory: [{
		carbTaxTonne: Number,
		compRebuildCost: Number,
		companyName: String,
		custName: String,
		date: String,
		drillTimePercent: Number,
		dthBit: Number,
		dthComp: Number,
		dthHammer: String,
		dthWap: Number,
		elevation: Number,
		engineRebuildCost: Number,
		estHours: Number,
		fracturization: String,
		fuelCost: Number,
		fuelTankSize: Number,
		holeDepth: Number,
		itemId: Number,
		pipeSize: Number,
		projName: String,
		rotBit: Number,
		rotPulldown: Number,
		rotRpm: Number,
		temp: Number,
		ucs: Number
	}]
});

module.exports = mongoose.model('CalcHistory', CalcHistorySchema);