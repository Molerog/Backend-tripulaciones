const User = require("../models/User");
const Comment = require("../models/Comment");
const Score = require("../models/Score");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res, next) {
    try {
      let hash;
      if (req.body.password !== undefined) {
        hash = bcrypt.hashSync(req.body.password, 10)
      }
      if (req.file) req.body.imagepath = req.file.filename;
      if (req.body.email === "moltorger@gmail.com") {
        const user = await User.create({
          ...req.body,
          confirmed: true,
          password: hash,
          role: "admin"
        });
        return res.status(201).send({ message: "Welcome back my master", user })
      } else {
        const user = await User.create({
          ...req.body,
          confirmed: false,
          password: hash,
          role: "user"
        });
        const emailToken = await jwt.sign(
          { email: req.body.email },
          JWT_SECRET,
          { expiresIn: '48h' }
        );
        const url = "https://app-rutopic.herokuapp.com/users/confirm/" + emailToken;
        await transporter.sendMail({
          to: req.body.email,
          subject: "Confirma tu registro a nuestra App de Rutas",
          html: `<h2>¡Hola, ${user.name}!</h2>
            <p>Para finalizar tu registro correctamente <a href=${url}>haz click aquí</a>. </p>`
        })
        res.status(201).send({ message: "Te hemos enviado un email para confirmar tu registro", user })
      }
    } catch (error) {
      console.error(error);
      error.origin = "User";
      next(error)
    }
  },

  async confirm(req, res) {
    try {
      const payload = jwt.verify(req.params.emailToken, JWT_SECRET);
      await User.updateOne({ email: payload.email }, { $set: { confirmed: true } });
      res.status(201).send(`Tu correo ha sido verificado correctamente.`)
    } catch (error) {
      console.error(error);
      res.status(404).send(`Enlace roto :'(`)
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({ message: "Correo y/o contraseña incorrectos" })
      };
      if (!user.confirmed) {
        return res.status(400).send({ message: "Por favor, debes confirmar tu email" })
      };
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Correo y/o contraseña incorrectos" })
      };
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.status(201).send({ message: "Bienvenid@, " + user.name, user, token })
    } catch (error) {
      res.status(401).send({ message: "Error al comprobar el usuario" })
    }
  },

  async userDelete(req, res) {
    try {  
      await Comment.deleteMany({ userId: req.user._id });
      await Score.deleteMany({ userId: req.user._id });
      const user = await User.findByIdAndDelete(req.user._id);
      res.status(201).send(
        { message: `El usuario ${user.name} ha sido eliminado` }
      )
    } catch (error) {
      res.status(401).send({ message: "Hubo un roblema al borrar el usuario" })
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.find();
      res.status(200).send(users)
    } catch (error) {
      res.status(400).send({ message: 'Ha habido un problema al cargar los usuarios.' })
    }
  },

  async getAllPaginated(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const users = await User.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).send(users)
    } catch (error) {
      console.error(error)
      res.status(400).send({ message: 'Ha habido un problema al cargar los usuarios' })
    }
  },

  async logoutUser(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization }
      });
      res.status(200).send({ message: "Desconectado" })
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo un problema al intentar desconectarse" })
    }
  },

  async update(req, res) {
    try {
      let hashedPassword;
      const { password } = req.body;
      if (password !== undefined) {
        hashedPassword = await bcrypt.hashSync(password, 10)
      }
      const updatedUser = {
        name: req.body.name,
        imagepath: req.file?.filename,
        email: req.body.email,
        password: hashedPassword,
        genre: req.body.genre
      };
      const user = await User.findByIdAndUpdate(req.user._id, updatedUser, {
        new: true
      });
      res.status(201).send({ message: "Usuario modificado con éxito", user })
    } catch (error) {
      console.error(error);
      res.status(400).send({ message: "Hubo un problema al intentar modificar el usuario" })
    }
  },

  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate("likes")
      res.status(200).send(user)
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Hubo problemas para traer tu información" })
    }
  },

  async cypressTest(req, res) {
    try {
      await User.updateOne(
        { email: "radec@gmail.com" },
        { $set: { confirmed: true } })
      res.status(201).send('Usuario confirmado correctamente')
    } catch (error) {
      res.status(404).send('El enlace dejó de funcionar')
    }
  }
};

module.exports = UserController