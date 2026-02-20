import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  address: z.string().optional(),
  gender: z.enum(["male", "female", "other"]),
  profile: z
    .any()
    .optional(),
});
