const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        min: [1, 'Mínima puntuación 1'],
        max: [5, 'Máxima puntuación 5']
      },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    routeId: {
        type: ObjectId,
        ref: 'Route'
    },
   

}, { timestamps: true });

const Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;