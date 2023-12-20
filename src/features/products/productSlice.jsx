import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductById,
  fetchProductsFilter,
  updateProduct,
} from "./productsAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  selectedProduct: null,
  totalItems: 0,
  status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data } = await fetchAllProducts();
    return data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "products/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const { data } = await fetchProductsFilter(filter, sort, pagination);
    return data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const { data } = await fetchAllBrands();
    return data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const { data } = await fetchAllCategories();
    return data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductByIdAsync",
  async (id) => {
    const { data } = await fetchProductById(id);
    return data;
  }
);

export const createProductAsync = createAsyncThunk(
  "products/createProductAsync",
  async (product) => {
    const { data } = await createProduct(product);
    return data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProductAsync",
  async (product) => {
    const { data } = await updateProduct(product);
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedPrdouct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })

      // FILTER
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      // BRANDS
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })

      // CATEGORIES:

      // (Fetch-All-Categories)
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })

      // (Fetch-Product-By-Id)
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })

      // Create Product
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })

      // Update Product
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        // state.products.splice(index, 1, action.payload);
      });
  },
});

export const { clearSelectedPrdouct } = productsSlice.actions;

export const selectBrands = (state) => state.product.brands;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export default productsSlice.reducer;
