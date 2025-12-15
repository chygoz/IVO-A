interface IPrice {
  currency: "USD" | "NGN";
  value: string;
  promoValue?: string;
}

interface IDimension {
  length?: number;
  width?: number;
  height?: number;
}

interface IShipping {
  weight?: number;
  weightUnit?: "g" | "kg" | "lb" | "oz" | "metric";
  dimension?: IDimension;
}

export interface IGallery {
  _id: string;
  url: string;
  mode?: string;
  type?: string;
  view?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISize {
  name: string;
  code: string;
  displayName: string;
  sortOrder: number;
}

export interface IColor {
  name: string;
  code: string;
  hex: string;
}

export interface IVariant {
  _id: string;
  sku: string;
  quantity: number;
  pendingQuantity: number;
  status?: "in-stock" | "out-of-stock" | "low-stock";
  gallery: IGallery[];
  active: boolean;
  size: ISize;
  color: IColor;
  createdAt: string;
  updatedAt: string;
}

export interface IBlank {
  _id: string;
  name: string;
  code: string;
  slug: string;
  description?: string;
  sizeFit?: string;
  published?: boolean;
  gender: "men" | "women" | "unisex";
  group: "adult" | "kids";
  mode: "pre-order" | "made-to-order" | "in-stock";
  status: "draft" | "published" | "archived";
  basePrice: IPrice;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  variants: IVariant[];
  shipping?: IShipping;
  tags: string[];
  details: string[];
  meta: {
    title?: string;
    description?: string;
  };
  publishReady: boolean;
  source: "art" | "blank";
  user: string;
  business: {
    _id: string;
    name: string;
    slug: string;
  };
  lookBuilders: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  inventory: {
    totalStock: number;
    availableColors: string[];
    availableSizes: string[];
  };
}

export interface BlankResponse {
  data: IBlank;
  error?: string;
}
export interface MultiBlankResponse {
  data: {
    results: IBlank[],
    metadata: {
      totalCount: number;
      page: number;
      limit: number;
      totalPages: number;
    },
    filters: {},
  },
}
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
