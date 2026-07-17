import { Property } from "../model/propertyModel.js";
import { propertySchema } from "../validators/propertyValidator.js";
import { Op } from "sequelize";

export const createProperty = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
  
    try {
  
        const data = {
            ...req.body,
          
            price: Number(req.body.price),
            area: Number(req.body.area),
            yearBuilt: Number(req.body.yearBuilt),
            level: Number(req.body.level),
            bed: Number(req.body.bed),
            bath: Number(req.body.bath),
            kitchen: Number(req.body.kitchen),
          
            amenities: Array.isArray(req.body.amenities)
              ? req.body.amenities
              : [req.body.amenities],
          };          
  
      // Validate
      const parsed = propertySchema.parse(data);
  
      // Images
      const images = req.files.map((f) =>
        f.path.replace(/\\/g, "/")
      );
      
      const property = await Property.create({
        ...parsed,
        images,
      });
  
      res.status(201).json(property);
  
    }  catch (err) {

        console.log("FULL ERROR:", err); // 👈 debug
      
        if (err instanceof Error && err.name === "ZodError") {
          console.log("ZOD ERRORS:", err.errors);
      
          return res.status(400).json({
            message: "Validation failed",
            errors: err.errors,
          });
        }
      
        res.status(500).json({
          message: "Server error",
          error: err.message,
        });
      }
    
  };
  
export const getProperties = async (req, res) => {
  try {

    const properties = await Property.findAll({
      order: [["createdAt", "DESC"]], // latest first (optional)
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });

  } catch (err) {

    console.error("Get properties error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: err.message,
    });
  }
};

export const getPropertyById = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user?.id;

    const property = await Property.findOne({
      where: { propertyId: Number(id) }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    // ⭐ Unique user view tracking
    if (userId) {

      const existingView = await PropertyView.findOne({
        where: { userId, propertyId: property.propertyId }
      });

      if (!existingView) {

        await PropertyView.create({
          userId,
          propertyId: property.propertyId
        });

        // ⭐ Atomic increment (VERY IMPORTANT)
        await Property.increment("viewCount", {
          where: { propertyId: property.propertyId }
        });
      }

    } else {

      // ⭐ Guest view count (optional)
      await Property.increment("viewCount", {
        where: { propertyId: property.propertyId }
      });

    }

    // ⭐ Fetch updated property AFTER increment
    const updatedProperty = await Property.findOne({
      where: { propertyId: property.propertyId }
    });

    res.json({
      success: true,
      data: updatedProperty
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const deleteProperty = async (req, res) => {

  try {

    const { id } = req.params; // ⭐ CHANGE HERE

    if (!id) {
      return res.status(400).json({
        message: "Property id required"
      });
    }

    const property = await Property.findOne({
      where: { propertyId: Number(id) }
    });

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    await property.destroy();

    return res.json({
      message: "Property deleted successfully"
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Delete failed"
    });
  }

};