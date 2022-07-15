const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
// const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res, next) {
    try {
      let hash;
      
      if (req.body.password !== undefined) {
        hash = bcrypt.hashSync(req.body.password, 10);
      }
      if (req.file) req.body.imagepath = req.file.filename;
      if (req.body.email === "moltorger@gmail.com") {
        const user = await User.create({
          ...req.body,
          confirmed: true,
          password: hash,
          role: "admin",
        });
        return res
          .status(201)
          .send({ message: "Welcome back my master", user });
      } else {
        const user = await User.create({
          ...req.body,
          confirmed: true,
          password: hash,
          role: "user",
        });
        //...req.body representa todo lo demás(es un spread y no podríamos modificar las propiedades que quisieramos de body)
        // const url = "http://localhost:8080/users/confirm/" + req.body.email; 
        // await transporter.sendMail({
        //   to: req.body.email,
        //   subject: "Confirme su registro",
        //   html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
        //  <a href="${url}"> Click para confirmar tu registro</a>
        //  `,
        // });
        res.status(201).send({
          // message: "We have sent you an email to confirm your register...",
          user,
        });
      }
    } catch (error) {
      console.log(error);
      error.origin = "User";
      next(error);
    }
  },
  async confirm(req, res) {
    //esta función confirm se aplica cuando clicamos en el enlace enviado al email
    try {
      await User.updateOne(
        {
          email: req.params.email,
        },
        { confirmed: true }
      ); //no esta actualizando el email, está buscando al usuario por el email introducido en el body al registrarse que volverá como parámetro
      res.status(201).send("User confirm succesfull");
    } catch (error) {
      console.error(error);
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .send({ message: "User or password incorrect..." });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "You may confirm your email" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "User or password incorrect..." });
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Bienvenido " + user.name, user, token });
    } catch (error) {
      res.status(401).send({ message: "We had an issue checking the user..." });
    }
  },
  async userDelete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.user._id)
      res.status(201).send({ message: `The user ${user} has been deleted` });
    } catch (error) {
      res.send({ message: "We had an issue removing the user..." });
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
    }
  },
}

module.exports = UserController;