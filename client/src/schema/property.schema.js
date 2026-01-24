import { z } from "zod";

export const propertySchema = z.object({

  // Basic Info
  title: z.string().min(1, "Title is required"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  propertyType: z.string().min(1, "Property type is required"),

  price: z
    .coerce
    .number()
    .positive("Price must be greater than 0"),

  area: z
    .coerce
    .number()
    .int("Area must be whole number")
    .positive(),

  propertyImage: z
  .any()
  .refine(
    (files) => files?.length > 0,
    "At least one image is required"
  ),

  // Location
  locationArea: z.string().min(1, "Area is required"),

  city: z.string().min(1, "City is required"),

  street: z.string().min(1, "Street is required"),

  zip: z
    .coerce
    .number()
    .int("ZIP must be a number")
    .min(1000, "Invalid ZIP"),


  // Amenities
  amenities: z
    .array(z.string())
    .min(1, "Select at least one amenity"),


  // Required (NOT optional anymore)
  leaseType: z.string().min(1, "Lease type is required"),

  tenantType: z.string().min(1, "Tenant type is required"),

  furnishingStatus: z.string().min(1, "Furnishing status is required"),


  // Property Details
  yearBuilt: z
    .coerce
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear()),

  level: z
    .coerce
    .number()
    .int()
    .min(0)
    .max(100),

  bed: z
    .coerce
    .number()
    .int()
    .min(0)
    .max(20),

  bath: z
    .coerce
    .number()
    .int()
    .min(0)
    .max(20),

  kitchen: z
    .coerce
    .number()
    .int()
    .min(0)
    .max(10),


  // System
  status: z
    .enum(["active", "rented", "hidden"])
    .default("active"),

  viewCount: z
    .coerce
    .number()
    .int()
    .min(0)
    .default(0),

  saveCount: z
    .coerce
    .number()
    .int()
    .min(0)
    .default(0),
});
