import { Color } from "../models/color";

export function convertFromIdToName(id: number, colors: Color[]) {
  return colors.find(c => c.id === id)?.name;
}
