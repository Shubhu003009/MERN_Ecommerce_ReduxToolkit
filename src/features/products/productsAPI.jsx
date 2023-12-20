import instance from "../../app/config";

export function fetchAllProducts() {
  return instance.get("/products");
}

export async function fetchProductsFilter(filter, sort, pagination) {
  let queryString = "";

  for (let key in filter) {
    let categoriesValues = filter[key];
    if (categoriesValues.length > 0) {
      let lastCategoriesValues = categoriesValues[categoriesValues.length - 1];
      queryString += `${key}=${lastCategoriesValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  let res = instance.get(`/products?${queryString}`);
  let data = (await res).data;
  let totalItems = (await res).headers.get("X-total-Count");
  return { data: { products: data, totalItems: +totalItems } };
}

export function fetchAllCategories() {
  return instance.get("/categories");
}

export function fetchAllBrands() {
  return instance.get("/brands");
}

export function fetchProductById(id) {
  return instance.get(`/products/${id}`);
}

export function createProduct(product) {
  return instance.post(`/products`, product);
}

export function updateProduct(itemUpdate) {
  return instance.patch(`/products/${itemUpdate.id}`, itemUpdate);
}
