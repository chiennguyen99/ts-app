export interface ErrorProduct {
  id: string;
  errorDescription: string;
  image: string;
  name: string;
  sku: string;
  color: number;
}

export interface ErrorProductInTable {
  id: string;
  errorDescription: string;
  image: JSX.Element;
  name: JSX.Element;
  sku: JSX.Element;
  color: JSX.Element;
}

export interface Color {
  id: number;
  name: string;
}
