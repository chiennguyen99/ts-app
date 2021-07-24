export interface ErrorProduct {
  id: string;
  errorDescription: string;
  image: string;
  name: string;
  sku: string;
  color: number;
}

export interface ErrorProductsTable {
  id: JSX.Element;
  errorDescription: JSX.Element;
  image: JSX.Element;
  name: JSX.Element;
  sku: JSX.Element;
  color: JSX.Element;
}
