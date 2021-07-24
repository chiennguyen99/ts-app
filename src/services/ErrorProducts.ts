import API from "../utils/api";

export async function getProducts() {
  return API.get("/products");
}

export async function getColors() {
  return API.get("/colors");
}
