import instance from "../../app/config";

export function createOrder(order) {
  return instance.post("/orders", order);
}

export async function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  let res = instance.get(`/orders?${queryString}`);
  let data = (await res).data;
  let totalOrders = (await res).headers.get("X-total-Count");
  return { data: { orders: data, totalOrders: +totalOrders } };
}

export function updateOrder(order) {
  return instance.patch(`/orders/${order.id}`, order);
}
