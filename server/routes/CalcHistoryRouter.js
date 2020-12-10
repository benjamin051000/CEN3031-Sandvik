const CalcHistoryController = require('../controllers/CalcHistoryController'),
express = require('express')
const CalcHistoryRouter = express.Router();

// basic CRUD functionality for a user's calculation history
CalcHistoryRouter.post('/', CalcHistoryController.create)
CalcHistoryRouter.get('/:userId', CalcHistoryController.getUserHistory)
//CalcHistoryRouter.put('/', CalcHistoryController.update)
//CalcHistoryRouter.delete('/', CalcHistoryController.delete)

module.exports = CalcHistoryRouter;