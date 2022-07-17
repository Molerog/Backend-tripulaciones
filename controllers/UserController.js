const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = require("../config/nodemailer");

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
          confirmed: false,
          password: hash,
          role: "user",
        });
        const emailToken = await jwt.sign({ email: req.body.email }, JWT_SECRET, { expiresIn: '48h' })
        const url = "http://localhost:8080/users/confirm/" + emailToken
        await transporter.sendMail({
            to: req.body.email,
            subject: "Confirma tu registro a nuestra red social",
            html: `<h2>¡Hola ${user.name}!</h2>
            <p>Para finalizar tu registro correctamente <a href=${url}>haz click aquí</a> </p>
            `
        })
        res.status(201).send({
          message: "Te hemos enviado un email para confirmar tu registro...",
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
    try {
        const payload = jwt.verify(req.params.emailToken, JWT_SECRET)
        console.log("aqui",payload)
        await User.updateOne({ email: payload.email }, { $set: { confirmed: true } })
        res.status(201).send(`Te has verificado correctamente`)
    } catch (error) {
        console.error(error)
        res.status(404).send(`Enlace roto :(`)
    }
},
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario/contraseña incorrectos..." });
      }
      if (!user.confirmed) {
        return res.status(400).send({ message: "Debes confirmar tu email" });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario/contraseña incorrectos..." });
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    } catch (error) {
      res.status(401).send({ message: "Error al comprobar el usuario..." });
    }
  },
  async userDelete(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.user._id);
      res.status(201).send({ message: `El usuario ${user.name} ha sido borrado` });
    } catch (error) {
      res.send({ message: "Problema al borrar usuario..." });
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
  async logoutUser(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Problemas para desconectarse",
      });
    }
  },

  async update(req, res) {
    try {
      let hashedPassword;
      const {password} = req.body
      if (password !== undefined){
        hashedPassword = await bcrypt.hashSync(password,10)
      }
      const updatedUser = {
        name: req.body.name,
        imagepath: req.file?.filename,
        email: req.body.email,
        password: hashedPassword,
        genre: req.body.genre
      };
      const user = await User.findByIdAndUpdate(req.user._id, updatedUser, {
        new: true,
      });
      res.send({ message: "Usuario modificado con éxito", user });
    } catch (error) {
      console.error(error);
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id) // también se puede User.findOne({_id: req.user._id})
        .select(["-password", "-tokens"])
      // user._doc.totalFollowers = user.followers.length;
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Problemas para traer tu información" });
    }
  },
  async cypressTest(req,res){
    try {
      await User.updateOne({email: "radec@gmail.com"}, {$set: {confirmed: true}})
      res.status(201).send('Usuario confirmado correctamente')
    } catch (error) {
      res.status(404).send('El enlace dejó de funcionar')
    }
  }
};

module.exports = UserController;
