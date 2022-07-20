const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
    {
      name: {
       type: String,
      },
      difficulty: {
        type: String,
      },
      imagepath: {
        type: String,
      },
      duration: {
        type: Number,
      },
      startingPoint: String,
      endingPoint: String,
      description: String,
      tags: [],
      
      pois: [{
        id: String,
        name: String,
        description: String,
        imagepath: String,
        latitude: Number,
        longitude: Number,
      }]
    },
    { timestamps: true }
  );
  
  const Route = mongoose.model("Route", RouteSchema);

  module.exports = Route