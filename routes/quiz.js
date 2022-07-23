const express = require('express');
const router = express.Router();
const QuizController = require ('../controllers/QuizController');
const { authentication} = require("../middleware/authentication");



router.post('/', authentication, QuizController.create)
router.get('/', QuizController.get)


module.exports = router