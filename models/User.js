const mongoose = require('mongoose');
const { isEmail } = require('validator');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, introduce tu nombre.'],
      minLength: [3, 'Por favor, introduce un nombre de más de 3 caracteres.'],
    },
    email: {
      type: String,
      unique: [true, 'Este email ya está regostrado.'],
      required: [true, 'Por favor, introduce un email.'],
      validate: [isEmail, 'Por favor, introduce un email válido.'],
      lowercase: [true, 'Por favor, introduce sólo minúsculas.'],
    },
    password: {
      type: String,
      required: [true, 'Por favor, introduce una contraseña.'],
    },
    genre: {
      type: String,
      required: [true, 'Por favor, selecciona un género.'],
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    role: String,
    confirmed: Boolean,
    imagepath: String,
    tokens: [],
    likes: [{ type: ObjectId }],
  },
  { timestamps: true }
);

//fire a function after doc saved to db
UserSchema.post('save', function (doc, next) {
  console.log('new user was created & saved', doc);
  next();
});

// fire a function before doc saved to db
UserSchema.pre('save', function (next) {
  console.log('user about to be created & saved', this);
  next();
});

UserSchema.pre('remove', function (next) {
  this.model('User').remove({ followers: this._id }, next);
});

// UserSchema.methods.toJSON = function() {
//   const user = this._doc
//   // user.totalFollowers2 = user.followers?.length; //el interrogante ignora el error al yo haberle indicado que no buscara en followers (undefined)
//   // delete user.password
//   return user
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;
