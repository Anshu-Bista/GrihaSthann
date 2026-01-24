import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),

  propertyType: z.string().min(1, "Property type is required"),

  price: z.string().min(1, "Price is required"),

  area: z.string().min(1, "Area is required"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  locationArea: z.string().min(1, "Area is required"),

  city: z.string().min(1, "City is required"),

  street: z.string().min(1, "Street is required"),

  zip: z.string().min(1, "ZIP is required"),

  propertyImage: z
    .any()
    .refine((files) => files?.length > 0, "Image is required"),

  amenities: z.array(z.string()).min(1, "Select at least one amenity"),

  leaseType: z.string().optional().or(z.literal("")),

  tenantType: z.string().optional().or(z.literal("")),

  furnishingStatus: z.string().min(1, "Furnishing status is required"),

  year: z.string().min(1, "Year is required"),

  level: z.string().min(1, "Level is required"),

  bed: z.string().min(1, "Bedroom is required"),

  bath: z.string().min(1, "Bathroom is required"),

  kitchen: z.string().min(1, "Kitchen is required"),
});
