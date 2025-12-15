import { z } from "zod";
export const variantSchema = z.object({
  color: z.object({
    hex: z.string().min(1, { message: "hex" }),
    name: z.string(),
  }),
  size: z
    .object({
      label: z.string().min(1, "Size label is required"),
      value: z.string().min(1, "Size value is required"),
    })
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Size selection is required",
          path: ["size"],
        });
      }
    }),
  quantity: z.number().min(1, { message: "quantity is required" }),
  price: z.string().optional(),
  currency: z.string(),
  images: z
    .array(
      z.object({
        image: z.string(),
        type: z.string(),
        mode: z.string(),
        view: z.string(),
      })
    ),
  id: z.string().optional(),
});

export type VariantFormData = z.infer<typeof variantSchema>;
