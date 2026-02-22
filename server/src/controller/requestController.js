import { Request } from "../model/requestModel.js";
import {  Property } from "../model/propertyModel.js";

export const createRequest = async (req, res) => {
    try {
      const { propertyId, visitDate } = req.body;
      const userId = req.user.id; // from auth middleware
  
      // 1️⃣ Check property exists
      const property = await Property.findByPk(propertyId);
      if (!property) {
        return res.status(404).json({
          message: "Property not found"
        });
      }
  
      // 2️⃣ Prevent duplicate request
      const existingRequest = await Request.findOne({
        where: {
          userId,
          propertyId,
          status: "pending"
        }
      });
  
      if (existingRequest) {
        return res.status(400).json({
          message: "You already sent a request for this property"
        });
      }
  
      // 3️⃣ Create request
      const newRequest = await Request.create({
        userId,
        propertyId,
        visitDate: visitDate || null,
        status: "pending"
      });
  
      return res.status(201).json({
        message: "Visit request sent successfully",
        data: newRequest
      });
  
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Failed to send request",
        error: error.message
      });
    }
};

export const getUserRequests = async (req, res) => {
  try {

    const userId = req.user.id;

    const requests = await Request.findAll({
      where: { userId },

      include: [
        {
          model: Property,
          attributes: [
            "propertyId",
            "title",
            "price",
            "images",
            "city",
            "locationArea"
          ]
        }
      ],

      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      success: true,
      data: requests
    });

  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch requests",
      error: error.message
    });
  }
};