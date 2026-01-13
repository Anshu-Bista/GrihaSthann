import fs from "fs";

const createUploadFolder=()=>{
    const dir = "./uploads";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log("Uploads folder created.");
    }
};

export {createUploadFolder};