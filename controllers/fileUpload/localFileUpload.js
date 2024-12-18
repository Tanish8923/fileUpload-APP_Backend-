exports.localFileUpload = (req, res) => {
    try {
    //   console.log("Request Body:", req.body);
    //   console.log("Request Files:", req.files);
  
      // Fetch file
      if (!req.files || !req.files.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded. Ensure the 'file' key is used.",
        });
      }
  
      const file = req.files.file;
  
      // Define path
      const path = __dirname + "/../files/" + Date.now() + `.${file.name.split(".")[1]}`;
  
      // Move file
      file.mv(path, (error) => {
        if (error) {
          console.error("Error in file.mv:", error);
          return res.status(500).json({
            success: false,
            message: "File upload failed.",
          });
        }
  
        res.json({
          success: true,
          message: "Local file uploaded successfully.",
        });
      });
    } catch (error) {
      console.error("Error in localFileUpload:", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  