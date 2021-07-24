import { ErrorProduct } from "../models/errorProduct";

export function compareTwoProducts(productA: ErrorProduct, productB: ErrorProduct) {
  return JSON.stringify(productA) === JSON.stringify(productB);
}

export function validateNameProduct(name: string) {
  return name !== undefined && name !== null && name.length > 0 && name.length <= 50;
}

export function validateSKUProduct(sku: string) {
  return sku !== undefined && sku !== null && sku.length > 0 && sku.length <= 20;
}

export function validateColorProduct(color: number) {
  return color !== undefined && !isNaN(color);
}

export function removeProduct(id: string, productList: ErrorProduct[]) {
  return productList.filter((p) => (p.id !== id));
}
