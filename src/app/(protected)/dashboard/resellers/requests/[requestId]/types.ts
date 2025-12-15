
import { Color, Gallery, Price } from "@/actions/products/types";
import { IUser } from "@/actions/user/util";
import { ProductStockLevel } from "@/types";

export interface Size {
  name: string;
  code: string;
  sortOrder: number;
}

export interface Variant {
  color: Color;
  size: Size;
  quantity: number;
  status?: ProductStockLevel;
  price?: Price;
  gallery: Gallery[];
  active: boolean;
}

export interface Product {
  name: string;
  description: string;
  slug: string;
  gender: string;
  basePrice: Price;
  mode: string;
  sizeFit: string;
  details: string[];
  category?: { name: string };
  itemCollection?: string;
  status?: string;
  variants: Variant[];
  shipping?: {
    weight: number;
    weightUnit: string;
    dimension: {
      length: number;
      width: number;
      height: number;
    };
  };
  lookBuilders?: any[];
}

export type Submission = {
  _id: string;
  type: string;
  business: {
    name: string;
    _id: string;
  };
  items: Product[];
  status: string;
  initiated: {
    user: IUser;
    initiatedAt: Date;
  };
  category: string;
  approved: {
    user: IUser;
    approvedAt: Date;
  };
  updates: {
    status: string;
    reason: string;
    updatedBy: IUser;
    updatedAt: Date;
  }[];
};
