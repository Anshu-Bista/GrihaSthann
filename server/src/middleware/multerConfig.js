import multer from "multer";
import path from "path";
import fs from "fs";

// Dynamic storage
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let folder = "uploads/others";

    // If uploading property images
    if (req.baseUrl.includes("properties")) {
      folder = "uploads/properties";
    }

    // If uploading user images (future)
    if (req.baseUrl.includes("users")) {
      folder = "uploads/users";
    }

    // Create folder if not exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },

});

//File filter to allow only specific file types
const fileFilter =(req, file, cb)=>{
    const allowedTypes = ["image/png","image/jpeg","image/gif"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error("Invalid file type. Only jpeg, png and gif are allowed."), false);
    }
};

//Initialize multer
const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize:1024* 1024 * 5 }, // 5MB file size limit
});
   
export default upload;
   