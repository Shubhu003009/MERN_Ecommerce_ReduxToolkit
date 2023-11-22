import axios from "axios";

export function createOrder(order) {
  return axios.post("http://localhost:8080/orders",order);
}
