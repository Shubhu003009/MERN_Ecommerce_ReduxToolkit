import instance from "../../app/config";

export function fetchLoggedInUserOrders(id) {
  return instance.get(`/orders/?user.id=${id}`);
}

export function fetchLoggedInUser(id) {
  return instance.get(`/users/${id}`);
}

export function updateUser(update) {
  return instance.patch(`/users/${update.id}`, update);
}