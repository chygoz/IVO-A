type Currency = "USD" | "NGN";

export interface ProductColor {
  name: string;
  hex: string;
  code: string; // Add a unique color code for easier reference
}

// Export the Product type from the actions directory instead of defining our own
// Re-export other necessary types with proper structure
export interface IGallery {
  url: string;
  mode: string;
  type: string;
  view: string;
  _id?: string;
}

export interface IVariant {
  _id: string;
  sku: string;
  quantity: number;
  pendingQuantity?: number;
  status: "in-stock" | "out-of-stock" | "limited-stock";
  gallery: IGallery[];
  active: boolean;
  size: {
    name: string;
    code: string;
    displayName: string;
    sortOrder: number;
  };
  color: {
    name: string;
    hex: string;
    code: string;
  };
  price?: {
    value: string;
    currency: Currency; // Use the defined Currency type
  };
}

export type IProductSex = "men" | "women" | "unisex";

export type IProductStockLevel = "out-of-stock" | "in-stock" | "limited-stock";

export type IProductStatus = "draft" | "published" | "archived";

export type IProductGroup = "adult" | "kids";

export type IProductAvailabilityMode = "on-sale" | "pre-order" | "available";
export type IProductSource = "product" | "blank";
export type IDimension = {
  length: number;
  width: number;
  height: number;
};

export interface IShipping {
  weight: number;
  weightUnit: string;
  dimension: IDimension;
}

// Import and re-export the Product type from actions
export type { Product as IProduct } from "@/actions/products/types.d";
