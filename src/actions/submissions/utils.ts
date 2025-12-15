import { ProductStockLevel } from "@/types";
import { Color, Gallery, Price } from "../products/types";
import { IUser } from "../user/util";
import { Size } from "recharts/types/util/types";

export const CLIENT_URL = `/api/v1/submissions`;

export type SubmissionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"
  | "modified";
export type SubmissionType = "blank" | "product";

export type SubmissionCategory = "add" | "edit" | "delete";

export interface Variant {
  color: Color;
  size: Size;
  quantity: number;
  status?: ProductStockLevel;
  price?: Price;
  gallery: Gallery[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  gender: string;
  basePrice: Price;
  mode: string;
  sizeFit: string;
  details: string[];
  category?: { name: string };
  itemCollection?: string;
  status?: string;
  variants: Variant[];
}

export type Submission = {
  _id: string;
  type: SubmissionType;
  business: {
    name: string;
    _id: string;
  };
  items: Product[];
  status: SubmissionStatus;
  initiated: {
    user: IUser;
    initiatedAt: Date;
  };
  category: SubmissionCategory;
  approved: {
    user: IUser;
    approvedAt: Date;
  };
  updates: {
    status: SubmissionStatus;
    reason: string;
    updatedBy: IUser;
    updatedAt: Date;
  }[];
};
