import axios from "axios";

export function fetchItems() {
  return axios.get("http://localhost:8080/cart");
}

export function addToCart(item) {
  return axios.post("http://localhost:8080/cart", item);
}

export function fetchItemsByUserId(userId) {
  return axios.get(`http://localhost:8080/cart?user=${userId}`);
}

export function updateItem(id, itemUpdate) {
  return axios.patch(`http://localhost:8080/cart/${id}`, itemUpdate);
}

export function deleteItem(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`);
}

export async function resetCart(id) {
  const { data } = await fetchItemsByUserId(id);
  for (let item of data) {
    await deleteItem(item.id);
  }
} 
