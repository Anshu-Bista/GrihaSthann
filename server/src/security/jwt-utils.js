import jwt from "jsonwebtoken";


export const generateToken=(payLoad)=>{
    const options = {
        expiresIn:"1hr"
    }

    return jwt.sign(payLoad, "secret-key", options);
}