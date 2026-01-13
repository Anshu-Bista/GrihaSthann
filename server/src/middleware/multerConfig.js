import multer from "multer";
import path from "path";

//Set up storage engine
const storage= multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
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
   