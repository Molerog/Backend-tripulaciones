const Quiz = require("../models/Quiz");
const User = require("../models/User");


const QuizController = {
  async create(req, res) {
    try {
      const quiz = await Quiz.create({ ...req.query, userId: req.user._id })
      await User.findByIdAndUpdate(req.user._id, {
        $push: { quiz: quiz._id }
      });
      res.status(201).send({message:"cuestionario enviado!", quiz })
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: 'Ha habido un problema al crear el quiz' })

    }
  },

  async get(req, res) {
    try {
      const quiz = await Quiz.find();
      res.status(200).send(quiz)
    } catch (error) {
      console.log(error)
      res.status(400).send({ message: 'Ha habido un problema al cargar el quiz' })
    }
  },
};

module.exports = QuizController