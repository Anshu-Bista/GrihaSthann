import { z } from "zod";

export const propertySchema = z.object({
  // Basic
  title: z.string().min(1, "Title is required"),

  propertyType: z.string().min(1, "Property type is required"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),

  area: z
    .number({ invalid_type_error: "Area must be a number" })
    .positive("Area must be greater than 0"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  // Location
  locationArea: z.string().min(1, "Area is required"),

  city: z.string().min(1, "City is required"),

  street: z.string().min(1, "Street is required"),

  zip: z
    .number({ invalid_type_error: "ZIP must be a number" })
    .int("ZIP must be an integer"),

  // Images
  propertyImage: z
    .any()
    .refine((files) => files?.length > 0, "Image is required"),

  // Amenities
  amenities: z
    .array(z.string())
    .min(1, "Select at least one amenity"),

  // Optional filters
  leaseType: z.string().optional().or(z.literal("")),

  tenantType: z.string().optional().or(z.literal("")),

  furnishingStatus: z
    .string()
    .min(1, "Furnishing status is required"),

  // Property Info
  year: z
    .number({ invalid_type_error: "Year must be a number" })
    .int()
    .min(1800, "Invalid year")
    .max(new Date().getFullYear()),

  level: z
    .number({ invalid_type_error: "Level must be a number" })
    .int()
    .min(1, "Level must be at least 1")
    .max(20),

  bed: z
    .number({ invalid_type_error: "Bedroom must be a number" })
    .int()
    .min(0)
    .max(20),

  bath: z
    .number({ invalid_type_error: "Bathroom must be a number" })
    .int()
    .min(0)
    .max(20),

  kitchen: z
    .number({ invalid_type_error: "Kitchen must be a number" })
    .int()
    .min(0)
    .max(10),

  // System Fields (Not in Form UI)
  status: z
    .enum(["active", "rented", "hidden"])
    .default("active"),

  viewCount: z
    .number()
    .int()
    .min(0)
    .default(0),

  saveCount: z
    .number()
    .int()
    .min(0)
    .default(0),
});
