const express = require("express");
const data = require ('./routes/routes')
const { typeError } = require('./middleware/errors');
const app = express();
require("dotenv").config();
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');
const cors = require ('cors');
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./config/config");
const axios = require('axios')
const Route = require('./models/Route');

const URL_API = "https://pilgrimtests.000webhostapp.com/mockapi/getall/";


app.use(express.static('./images'));

app.use(express.json());

app.use(cors());

dbConnection();

app.listen(PORT, console.log(`Server started on port ${PORT}`));

axios.get(URL_API)
    .then(async res => {
        const routes = res.data
        for (const route of routes) {
            Route.create({
                name: route.name,
                difficulty: route.difficulty,
                imagepath: route.image,
                duration: route.duration,
                startingPoint: route.startingPoint,
                endingPoint: route.endingPoint,
                description: route.description,
                tags:[route.tags],
                pois: [{
                    id: route.id,
                    name: route.name,
                    description: route.description,
                    imagepath: route.image,
                    latitude: route.latitude,
                    longitude: route.longitude,
                }]
            })
        }

    })

app.use(data)

// app.use('/routes',require ('./seeders/loadRoutes'));

app.use('/users', require ('./routes/users'));
app.use('/routes', require ('./routes/routes'));

app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs));

app.use(typeError)