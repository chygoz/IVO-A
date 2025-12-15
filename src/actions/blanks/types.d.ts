import { Metadata } from "../../types/index";

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
  shipping: {
    weight: number;
    weightUnit: "metric";
    dimension: {
      length: number;
      width: number;
      height: number;
    };
  };
  basePrice: Price; //"200000";
  category: string; //"6764985145ea728e3b2bf76e";
  status: "draft" | "published" | "archived";
  mode: "on-sale" | "pre-order" | "available";
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
  published?: boolean;
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
export interface BlanksData {
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
  inventory: {
    totalStock: number;
    availableColors: string[];
    availableSizes: string[];
  };
}
export interface ProductsResponse {
  data: {
    results: Product[];
    metadata: Metadata;
    filters?: BlankFilterParams;
  };
}

export interface BlankResponse {
  data: BlanksData;
}

export type Variant = BlanksData['variants'][0];

export type BlankFilterParams = {
  page?: number;
  limit?: number;
  category?: string;
  gender?: string;
  priceMin?: string | number;
  priceMax?: string | number;
  search?: string;
  color?: string;
  size?: string;
  sort?: string;
};
