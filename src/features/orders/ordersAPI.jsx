import instance from "../../app/config";


export function createOrder(order) {
  return instance.post("/orders", order);
}
