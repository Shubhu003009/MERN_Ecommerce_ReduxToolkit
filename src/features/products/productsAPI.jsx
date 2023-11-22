import axios from "axios";

export function fetchAllProducts() {
  return axios.get("http://localhost:8080/products");
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

  let res = axios.get(`http://localhost:8080/products?${queryString}`);
  let data = (await res).data
  let totalItems = (await res).headers.get("X-total-Count");
  return { data: { products: data, totalItems: +totalItems } };
}

export function fetchAllCategories() {
  return axios.get("http://localhost:8080/categories");
}

export function fetchAllBrands() {
  return axios.get("http://localhost:8080/brands");
}

export function fetchProductById(id) {
  return axios.get(`http://localhost:8080/products/${id}`);
}
