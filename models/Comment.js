const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
<<<<<<< HEAD
    body: {
      type: String,
      required: [true, 'Por favor, introduce un texto'],
    },

=======
    body: String,
>>>>>>> bd284041ec3b523cf2fff2bf54722754f9510045
    imagepath: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    routeId: {
        type: ObjectId,
        ref: 'Route'
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment