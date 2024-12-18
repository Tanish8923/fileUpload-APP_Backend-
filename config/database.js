const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB connected successfully"))
    .catch( (error) => {
        console.log("DB facing connection issue");
        console.error(error);
        process.exit(1);
    } )
}