import { z } from "zod";

/* ======================
   COMMON FIELDS
====================== */

// Email regex
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strong password regex
// min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(25, "Name must be less than 50 characters");

const emailSchema = z
  .string()
  .regex(emailRegex, "Invalid email address")
  .max(30);

const passwordSchema = z
  .string()
  .regex(
    passwordRegex,
    "Password must contain uppercase, lowercase, number & special character"
  )
  .max(30);

/* ======================
   LOGIN SCHEMA
====================== */

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

/* ======================
   REGISTRATION SCHEMA
====================== */

export const registerSchema = z
  .object({
    name: nameSchema,

    email: emailSchema,

    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be 10 digits")
      .optional(),

    address: z
      .string()
      .max(50, "Address too long")
      .optional(),

    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Select a gender" })
    }),

    password: passwordSchema,

    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
