// types/product.ts
export interface ProductMeta {
  title: string;
  description: string;
}

export interface ProductGalleryImage {
  url: string;
  mode: string;
  type: string;
  view: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSize {
  name: string;
  code: string;
  displayName: string;
  sortOrder: number;
}

export interface ProductColor {
  name: string;
  code: string;
  hex: string;
}

export interface ProductVariant {
  sku: string;
  quantity: number;
  status: string;
  gallery: ProductGalleryImage[];
  active: boolean;
  size: ProductSize;
  color: ProductColor;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LookBuilder {
  // Define this based on your API structure
  _id: string;
  name?: string;
}

export interface ProductDetail {
  // Define this based on your API structure
  _id: string;
  name?: string;
  value?: string;
}

export interface Product {
  meta: ProductMeta;
  _id: string;
  name: string;
  code: string;
  published: boolean;
  status: string;
  mode: string;
  slug: string;
  description: string;
  sizeFit: string;
  gender: string;
  group: string;
  lookBuilders: LookBuilder[];
  details: ProductDetail[];
  category: string;
  basePrice: string;
  variants: ProductVariant[];
  tags: string[];
  user: string;
  business: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductApiResponse {
  status: string;
  data: Product;
}

export type ProductStatus = "draft" | "active" | "archived";
export type ProductMode = "regular" | "pre-order" | "sale";
export type ProductGender = "men" | "women" | "unisex" | "children";
export type ProductGroup = "adult" | "children" | "infant";
export type VariantStatus = "in-stock" | "out-of-stock" | "low-stock";
