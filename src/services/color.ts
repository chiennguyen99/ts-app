import API from "../utils/api";

export async function getColors() {
  return API.get("/colors");
}
