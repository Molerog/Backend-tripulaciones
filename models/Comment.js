const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Por favor, introduce un texto'],
    },

    imagepath: String,
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    routeId: {
      type: ObjectId,
      ref: 'Route',
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
