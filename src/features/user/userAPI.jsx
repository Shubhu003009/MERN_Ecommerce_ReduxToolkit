import axios from "axios";

export function fetchLoggedInUserOrders(id) {
  return axios.get(`http://localhost:8080/orders/?user.id=${id}`);
}

export function fetchLoggedInUser(id) {
  return axios.get(`http://localhost:8080/users/${id}`);
}

export async function updateUser(update) {
  return axios.patch(`http://localhost:8080/users/${update.id}`, update);
}
