// const axios = require('axios')
// const Route = require('../models/Route');
// const { dbConnection } = require("../config/config");
// const PORT = process.env.PORT || 3001;

// dbConnection()

// app.listen(PORT, console.log(`Server started on port ${PORT}`));



// const URL_API = "https://pilgrimtests.000webhostapp.com/mockapi/getall/";

// const data = axios.get(URL_API)
//     .then(async res => {
//         console.log('hola caracola')
//         const routes = res.data
//         for (const route of routes) {
//             Route.create({
//                 name: route.name,
//                 difficulty: route.difficulty,
//                 imagepath: route.image,
//                 duration: route.duration,
//                 startingPoint: route.startingPoint,
//                 endingPoint: route.endingPoint,
//                 description: route.description,
//                 tags:[route.tags],
//                 pois: [{
//                     id: route.id,
//                     name: route.name,
//                     description: route.description,
//                     imagepath: route.image,
//                     latitude: route.latitude,
//                     longitude: route.longitude,
//                 }]
//             })
//         }

//     })

//     async (res)=> {
//         console.log('hola?')
//     await axios.get(URL_API)
//     const routes = res.data;
//     for (const route of routes){
//         Route.create({
//             name: route.name,
//             difficulty: route.difficulty,
//             imagepath: route.image,
//             duration: route.duration,
//             startingPoint: route.startingPoint,
//             endingPoint: route.endingPoint,
//             description: route.description,
//             tags:[route.tags],
//             pois: [{
//                 id: route.id,
//                 name: route.name,
//                 description: route.description,
//                 imagepath: route.image,
//                 latitude: route.latitude,
//                 longitude: route.longitude,
//             }]
//         })
//     }
    
// }

// module.exports = data