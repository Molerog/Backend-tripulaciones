const mongoose = require('mongoose');
const { isEmail } = require('validator');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, introduce tu nombre.'],
    minLength: [3, 'Por favor, introduce un nombre de más de 3 caracteres.']
  },

  email: {
    type: String,
    unique: [true, 'Este email ya está regostrado.'],
    required: [true, 'Por favor, introduce un email.'],
    validate: [isEmail, 'Por favor, introduce un email válido.'],
    lowercase: [true, 'Por favor, introduce sólo minúsculas.']
  },

  password: {
    type: String,
    required: [true, 'Por favor, introduce una contraseña.']
  },

  genre: {
    type: String,
    required: [true, 'Por favor, selecciona un género.']
  },

  imagepath: String,
  role: String,
  confirmed: Boolean,
  tokens: [],

  commentsId: [{
    type: ObjectId,
    ref: 'Comment'
  }],

  likes: [{
    type: ObjectId,
    ref: 'Route'
  }],
  quiz: [{
    type: ObjectId,
    ref: 'Quiz'
  }],

  scoresId: [{
    type: ObjectId,
    ref: 'Score'
  }]
}, { timestamps: true });

// UserSchema.pre('deleteOne', function (next) {
//   console.log('hola')
//   const userId = this.getQuery()["_id"];
//   mongoose.model("Route").deleteMany({'user': userId}, function (err, result) {
//     if (err) {
//       console.log(`[error] ${err}`);
//       next(err);
//     } else {
//       console.log('success');
//       next();
//     }
//   });
// });

const User = mongoose.model('User', UserSchema);

module.exports = User