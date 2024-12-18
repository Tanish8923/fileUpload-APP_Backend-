const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
require("dotenv").config();

const fileUploadSchema = mongoose.Schema({
    name :{
        type : String ,
        required : true
    } ,
    email :{
        type : String ,
        required : true
    },
    tags : {
        type : String ,
        required : true
    },
    fileUrl : {
        type : String ,
        required : true
    }
})

//post middleware
fileUploadSchema.post("save" , async function (doc) {
    try {
        //transporter
        let transporter = nodeMailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        });

        //send email
        await transporter.sendMail({
            from : process.env.MAIL_USER,
            to : doc.email,
            subject : "New file uploaded on cloudinary",
            html : `<h1>Hello jee</h1><p>File uploaded successfully! </br> view here : <a href="${doc.fileUrl}">${doc.fileUrl}</a></p>`
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = mongoose.model("fileUploadSchema" , fileUploadSchema);