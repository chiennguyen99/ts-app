import API from "../utils/api";

export async function getProducts() {
  return API.get("/products");
}
