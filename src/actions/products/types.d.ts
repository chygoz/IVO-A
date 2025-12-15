import { Metadata } from "@/types";

export interface CreateVariantInput {
  price?: Price;
  quantity: number;
  color: Color;
  size: {
    name: string; //"M";
    code: string; //"MD";
    displayName: string; //"Medium";
    sortOrder: number; //1;
  };
  gallery: Gallery[];
}

export type Gallery = {
  type: string; //"full";
  view: string; //"front";
  mode: string; //"product";
  url: string; //"https://res.cloudinary.com/dqml918tz/image/upload/v1734692007/ivo-stores/ivo-stores/media/q2v5pg0pdcyizzxmwytx.png";
};

export type Color = {
  name: string; //"black";
  hex: string; // "#000";
  code: string; //"bl";
};

type Currency = "USD" | "NGN";

type Price = {
  currency: Currency;
  value: string;
};

export interface CreateProductInput {
  name: string;
  description: string;
  sizeFit: string;
  gender: "men" | "women" | "unisex";
  basePrice: Price; //"200000";
  category: string; //"6764985145ea728e3b2bf76e";
  status: "draft" | "published" | "archived";
  mode: "pre-order" | "made-to-order" | "in-stock" | "on-sale" | "available";
  variants: CreateVariantInput[];
}

export interface Product {
  meta: {
    title: string;
    description: string;
  };
  _id: string;
  name: string;
  code: string;
  published: boolean;
  status: "draft" | "published" | "archived";
  mode: "on-sale" | "pre-order" | "available";
  slug: string;
  description: string;
  sizeFit: string;
  gender: "women" | "men" | "unisex";
  group: "adult" | "kids";
  lookBuilders: [];
  details: [];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  basePrice: Price;
  variants: {
    sku: string;
    quantity: number;
    status: "in-stock";
    gallery: {
      url: string;
      mode: "product" | "model";
      type: "half";
      view: "front";
      _id: string;
    }[];
    active: boolean;
    size: {
      name: string;
      code: string;
      displayName: string;
      sortOrder: number;
    };
    color: {
      name: string;
      code: string;
      hex: string;
    };
    _id: string;
  }[];
  tags: [];
  user: string;
  business: {
    _id: string;
    name: string;
    slug: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductsResponse {
  data: {
    results: Product[];
    metadata: Metadata;
  };
}
export interface ProductResponse {
  data: Product | null;
}
