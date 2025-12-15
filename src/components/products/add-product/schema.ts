import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(1, {
    message: "product is required",
  }),
  description: z.string().min(1, {
    message: "description is required",
  }),
  category: z.string().min(1, {
    message: "category is required",
  }),
  currency: z.string().min(1, {
    message: "currency is required",
  }),
  discount: z.object({
    type: z.string().optional(),
    value: z.string().optional(),
  }),
  collection: z.string().optional(),
  lookBuilder: z.array(z.string()).optional(),
  status: z.enum(["draft", "archived", "published"]),
  mode: z.enum(["pre-order", "on-sale", "made-to-order", "in-stock", "available"]),
  gender: z.enum(["men", "women", "unisex"]),
  sizeFit: z.string().min(1, {
    message: "size fit description is required",
  }),
  shipping: z.object({
    weight: z.number(),
    length: z.number(),
    height: z.number(),
    width: z.number(),
  }),
  basePrice: z.string().min(1, {
    message: "base price is required",
  }),
  variants: z
    .array(
      z.object({
        color: z.object({
          name: z.string(), //"black";
          hex: z.string(), // "#000";
          code: z.string(), //"bl";
        }),
        quantity: z.number(),
        size: z.object({
          name: z.string(), //"M";
          code: z.string(), //"MD";
          displayName: z.string(), //"Medium";
          sortOrder: z.number(), //1;
        }),
        price: z.string().optional(),
        gallery: z.array(
          z.object({
            type: z.string(), //"full";
            view: z.string(), //"front";
            mode: z.string(), //"product";
            url: z.string(),
          })
        ),
      })
    )
    .min(1, { message: "at least one variant is required" }),
});
