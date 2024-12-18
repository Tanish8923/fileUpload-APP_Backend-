const fileUploadModel = require("../../models/fileUploadModel");
const cloudinary = require("cloudinary").v2;

function isValidType(fileType , supportedType){
    return supportedType.includes(fileType);
}
exports.videoUpload = async(req , res) => {
    try {
        
        //fetch data
        const {name , tags , email} = req.body;
        const file = req.files.file;

        //validate type
        const supportedType = ["mp4" , "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
  
        

        if(!isValidType(fileType , supportedType)){
            return res.status(400).json({
                success : false , 
                message : "File format not supported"
            })
        }

        
        //upload on cloudinary
        const options = {
            folder : "fileUploadApp" ,
            // fetch_format: "auto",
            resource_type: "video",  
            //By default, Cloudinary's uploader.upload() method assumes the uploaded file is an image unless you
            //specify otherwise. This is why the API works fine for images but throws an error for videos.
            //When you upload a video without specifying the resource_type


            // quality : "auto"
        }
        const response = await cloudinary.uploader.upload(file.tempFilePath , options)
        console.log(response);


        //create entry in db
        await fileUploadModel.create({
            name ,
            email , 
            tags , 
            fileUrl : response.secure_url,
        })


        // delete the file at the specified path
        const fs = require('fs');

        fs.unlink(file.tempFilePath, (err) => {
            if (err) {
              console.error("Error deleting temporary file:", err);
            } else {
              console.log("Temporary file deleted.");
            }
          });
        
        //send response
        res.status(200).json({
            success:true,
            imageURL : response.secure_url,
            message : "file uploaded successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false , 
            message : "Internal server error"
        })
    }
}