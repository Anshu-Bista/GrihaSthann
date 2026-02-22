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

export const getAllRequests = async(req,res)=>{
    try{

        const requests = await Request.findAll({
            include:[
                User,
                Property
            ]
        });

        res.json({
            data: requests
        });

    }catch(err){
        res.status(500).json({
            message:"Failed to fetch requests"
        });
    }
};

export const updateRequest = async(req,res)=>{
    try{

        const { id } = req.params;
        const { status, visitDate } = req.body;

        const request = await Request.findByPk(id);

        if(!request){
            return res.status(404).json({
                message:"Request not found"
            });
        }

        request.status = status || request.status;

        if(status === "approved"){
            request.visitDate = visitDate || request.visitDate;
        }

        if(status === "rejected"){
            request.visitDate = null;
        }

        await request.save();

        res.json({
            message:"Request updated",
            data:request
        });

    }catch(err){
        res.status(500).json({
            message:"Update failed",
            error:err.message
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "profile",
          "role",
          "createdAt",
        ],
        where: {role: "user"},
        order: [["createdAt", "DESC"]],
      });
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to fetch users",
      });
    }
};