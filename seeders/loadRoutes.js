const axios = require("axios");
const Route = require("../models/Route");

const URL_API = "https://pilgrimtests.000webhostapp.com/mockapi/getall/";

  const prueba = async () => {
  const res = await axios.get(URL_API);
  console.log("hola cabezahuevo");
  const routes = res.data;
  for (const route of routes) {
    Route.create({
      name: route.name,
      difficulty: route.difficulty,
      imagepath: route.image,
      duration: route.duration,
      startingPoint: route.startingPoint,
      endingPoint: route.endingPoint,
      description: route.description,
      tags: [route.tags],
      pois: [
        {
          id: route.id,
          name: route.name,
          description: route.description,
          imagepath: route.image,
          latitude: route.latitude,
          longitude: route.longitude,
        },
      ],
    });
  }
};
prueba();

