import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Email inválido"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .optional(),
  email: z.email("Email inválido").optional(),
});
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// export const updateProfileSchema = z.object({
//   name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
//   email: z.email('Email inválido').optional(),
// });
// export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// export const changePasswordSchema = z.object({
//   currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
//   newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
// });
// export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
