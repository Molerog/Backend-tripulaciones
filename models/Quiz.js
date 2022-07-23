const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;



const QuizSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },

    age: {
        type: Number,
    },

    gender: {
        type: String,
    },

    time: {
        type: Number,
    },

    route_type: {
        type: String,
    },
    price: {
        type: String,
    }, 
    
    difficulty: {
        type: String,
    }, 
    companions: {
        type: String,
    },
    transport: {
        type: String,
      },

}, { timestamps: true });

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz