import { Property } from "../model/propertyModel.js";
import { propertySchema } from "../validators/propertyValidator.js";

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
  