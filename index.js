const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 4000 ;

//add middleware
app.use(express.json());

const file_Upload = require("express-fileupload");
const path = require('path');

app.use(file_Upload(
    {
        useTempFiles : true,
        tempFileDir: path.join(__dirname, 'tmp'),
    }
));

//mounting
const fileUpload = require("./routes/fileUpload");
app.use("/api/v1/upload" , fileUpload);

//db connection
const {dbConnect} = require("./config/database");
dbConnect();

//cloudinary connection
const {cloudinaryConnect} = require("./config/cloudinary");
cloudinaryConnect();

//activate server
app.listen(port , () => {
    console.log(`App listend at PORT ${port}`);
})

//default route
app.get("/" , (req , res) => {
    res.send(`<h1>This is file upload app Home page</h1>`)
})