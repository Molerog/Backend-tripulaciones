const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;


const RouteSchema = new mongoose.Schema({

 
  name: { type: String },

  difficulty: { type: String },

  imagepath: { type: String },

  duration: { type: Number },

  description_es: { type: String },

  transport: { type: String },

  type: { type: String },

  url: { type: String },

  image: { type: String },

  userId: {
    type: ObjectId,
    ref: "User"
  },

  commentsId: [{
    type: ObjectId,
    ref: "Comment"
  }],

  likes: [{ type: ObjectId, ref: "User" }],
  scoreMedia: [{ type: Number }],
  scoresId: [{
    type: ObjectId,
    ref: "Score"
  }],

  startingPoint: String,
  endingPoint: String,
  description: String,
  tags: [],
  poi: [{
    id: String,
    name: String,
    description_es: String,
    imagepath: String,
    latitude: Number,
    longitude: Number
  }]

}, { timestamps: true });


const Route = mongoose.model("Route", RouteSchema);

module.exports = Route