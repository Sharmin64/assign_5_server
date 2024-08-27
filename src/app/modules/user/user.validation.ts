import { z } from "zod";

const UserZodValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name must be required"),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email must be required and unique"),
    password: z.string().min(1, "Password must be required"),
    phone: z.string().min(1, "Phone must be required"),
    role: z.enum(["admin", "user"], {
      required_error: "Role must be required",
    }),
    address: z.string().min(1, "Address must be required"),
  }),
});

export default UserZodValidationSchema;
