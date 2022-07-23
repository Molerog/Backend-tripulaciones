const Quiz = require("../models/Quiz");
const User = require("../models/User");


const QuizController = {
  async create(req, res) {
    try {
      const quiz = await Quiz.create({ ...req.body, userId: req.user._id })
      await User.findByIdAndUpdate(req.user._id, {
        $push: { quiz: quiz._id }
      });
      res.status(201).send({ quiz })
    } catch (error) {
      console.error(error);
    }
  },

  async get(req, res) {
    try {
      const quiz = await Quiz.find();
      res.status(200).send(quiz)
    } catch (error) {
      res.status(400).send({ message: 'Ha habido un problema al cargar el quiz' })
    }
  },
};

module.exports = QuizController