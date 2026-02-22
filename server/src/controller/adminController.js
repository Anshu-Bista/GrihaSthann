import {  User } from "../model/userModel.js";
import {  Property } from "../model/propertyModel.js";
import {  Request } from "../model/requestModel.js";

export const getStats = async(req, res)=>{
    try{
        const totalUsers = await User.count({
            where:{role: "user"}
        });

        const totalLocations = await Property.count({
            distinct: true,
            col: "locationArea"
          });

        const totalVisits = await Request.count();

        const totalProperties = await Property.count();

        return res.status(200).json({
            totalUsers,
            totalLocations,
            totalVisits,
            totalProperties
        });

    }catch(error){
        console.error(error.message);
        return res.status(500).json({
            message: "Failed to fetch stats",
            error: error.message
        });
    }
};