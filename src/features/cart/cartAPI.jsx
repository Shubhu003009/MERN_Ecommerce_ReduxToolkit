import instance from "../../app/config";

export function fetchItems() {
  return instance.get("/cart");
}

export function addToCart(item) {
  return instance.post("/cart", item);
}

export function fetchItemsByUserId(userId) {
  return instance.get(`/cart?user=${userId}`);
}

export function updateItem(id, itemUpdate) {
  return instance.patch(`/cart/${id}`, itemUpdate);
}

export function deleteItem(id) {
  return instance.delete(`/cart/${id}`);
}

export async function resetCart(id) {
  const { data } = await fetchItemsByUserId(id);
  for (let item of data) {
    await deleteItem(item.id);
  }
}
