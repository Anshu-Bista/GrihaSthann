import { z } from "zod";

export const propertySchema = z.object({

  title: z.string().min(1),

  description: z.string().min(10),

  propertyType: z.string(),

  price: z.coerce.number().positive(),

  area: z.coerce.number().int(),

  locationArea: z.string(),

  city: z.string(),

  street: z.string(),

  zip: z.coerce.number(),

  amenities: z.array(z.string()),

  furnishingStatus: z.string(),

  yearBuilt: z.coerce.number().int(),

  level: z.coerce.number().int(),

  bed: z.coerce.number().int(),

  bath: z.coerce.number().int(),

  kitchen: z.coerce.number().int(),

  leaseType: z.string().optional(),

  tenantType: z.string().optional(),
});
