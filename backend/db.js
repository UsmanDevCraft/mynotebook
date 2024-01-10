const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mynotebook";
const print = () => {
    console.log("mongo connected successfully")
}
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, print());
};

module.exports = connectToMongo;