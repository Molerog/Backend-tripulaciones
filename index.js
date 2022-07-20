// require ('./seeders/loadRoutes')
require("dotenv").config();
const express = require("express");
const { typeError } = require('./middleware/errors');
const app = express();
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');
const cors = require ('cors');
const PORT = process.env.PORT || 3001;
const { dbConnection } = require("./config/config");


app.use(express.static('./images'));

app.use(express.json());

app.use(cors());

dbConnection();

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.use('/users', require ('./routes/users'));
app.use('/routes', require ('./routes/routes'));

app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs));

app.use(typeError)