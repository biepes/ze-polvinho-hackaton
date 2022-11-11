import { Satisfaction } from "pages/Home/Home";
import api from "service/Api";

export function getData(): Promise<Satisfaction[]> {
  return api.get("url");
}
