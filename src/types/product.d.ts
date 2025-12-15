export type ProductStockLevel = "low" | "medium" | "high";
export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  stockLevel: ProductStockLevel;
  price: string;
}
