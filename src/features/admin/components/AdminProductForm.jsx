import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedPrdouct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../products/productSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const AdminProductForm = () => {
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleDelete = () => {
    let userChoice = confirm("Are you sure you want to delete");
    if (userChoice) {
      let product = { ...selectedProduct };
      product.deleted = true;
      dispatch(updateProductAsync(product));
      navigate("/admin");
    }
  };

  const handleFormSubmit = (data) => {
    let userChoice = confirm("Are you sure you want to save");
    if (userChoice) {
      let product = { ...data };
      product.images = [
        product.image1,
        product.image2,
        product.image3,
        product.thumbnail,
      ];
      product.rating = 0;
      product.price = +product.price;
      product.discountPercentage = +product.discountPercentage;
      product.stock = +product.stock;

      delete product["image1"];
      delete product["image2"];
      delete product["image3"];

      if (params.id) {
        product.id = params.id;
        product.rating = selectedProduct.rating || 0;
        dispatch(updateProductAsync(product));
        navigate("/admin");
      } else {
        dispatch(createProductAsync(product));
      }

      navigate("/admin");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedPrdouct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("stock", selectedProduct.stock);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
    }
  }, [selectedProduct, params.id, setValue]);

  return (
    <form noValidate className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-10">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("title", { required: "title is required" })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.title && (
                  <span className="text-red-500">{errors.title.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "description is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write something about the product.
              </p>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    min={0}
                    {...register("price", {
                      required: "price is required",
                      min: 0,
                    })}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.price && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    min={0}
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.discountPercentage && (
                  <span className="text-red-500">
                    {errors.discountPercentage.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    min={0}
                    {...register("stock", {
                      required: "stock is required",
                      min: 0,
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.stock && (
                  <span className="text-red-500">{errors.stock.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="Thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.thumbnail && (
                  <span className="text-red-500">
                    {errors.thumbnail.message}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    id="image1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.image1 && (
                  <span className="text-red-500">{errors.image1.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("image2", {
                      required: "image2 is required",
                    })}
                    id="image2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.image2 && (
                  <span className="text-red-500">{errors.image2.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("image3", {
                      required: "image3 is required",
                    })}
                    id="image3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.image3 && (
                  <span className="text-red-500">{errors.image3.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <div className="flex">
                  <select
                    className="rounded-md p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option value="">Select-Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.label} value={brand.label}>
                        {brand.value}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.brand && (
                  <span className="text-red-500">{errors.brand.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <div className="flex">
                  <select
                    className="rounded-md p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">Select-Category</option>
                    {categories.map((category) => (
                      <option key={category.label} value={category.label}>
                        {category.value}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <span className="text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Extra Info For The Product
          </h2>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      disabled
                      id="comments"
                      // {...register("comments")}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      disabled
                      id="candidates"
                      // {...register("candidates")}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      disabled
                      id="offers"
                      // {...register("offers")}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => navigate("/admin")}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit((d) => handleFormSubmit(d))}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        {selectedProduct && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete Product?
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminProductForm;
