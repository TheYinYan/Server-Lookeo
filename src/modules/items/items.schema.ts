import { z } from "zod";

export const createItemSchema = z.object({
  type: z.string(),
  color: z.array(z.string()),
  season: z.array(z.enum(["Primavera", "Verano", "Otoño", "Invierno"])),
  style: z.array(z.string()),
  imgUrl: z.array(z.url()),
  notes: z.string().default(""),
});
export type CreateItemInput = z.infer<typeof createItemSchema>;

export const updateItemSchema = createItemSchema
  .partial()
  .extend({
    notes: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes proporcionar al menos un campo para actualizar",
  });
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
