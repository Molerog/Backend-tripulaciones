const moongose = require('moongose');
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI


const dbConnection = async() =>{
    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        
    }
};

module.exports = {
    dbConnection,   
};