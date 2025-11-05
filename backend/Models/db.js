const mongoose = require('mongoose');

const mongo_rul = process.env.MONGO_CONN;

mongoose.connect(mongo_rul)
    .then(()=>{
        console.log("MONGODB connected....")
    }).catch((err)=>{
        console.log("mongoDB connection Error: ", err);
    })