import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [selectedEditIndex, setselectedEditIndex] = useState(-1);
  const { register, handleSubmit, reset, setValue } = useForm();

  let handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setselectedEditIndex(-1);
  };

  let handleRemove = (index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  let handleEditForm = (index) => {
    setselectedEditIndex(index);
    const address = user.addresses[index];
    setValue("fullName", address.fullName);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("state", address.state);
    setValue("city", address.city);
    setValue("street", address.street);
    setValue("pincode", address.pincode);
  };

  return (
    <div className=" mx-auto mt-16 max-w-7xl px-2 sm:px-6 lg:px-8">
      <h3 className="text-3xl my-2 sm:my-1 text-center sm:text-left font-medium tracking-tight text-gray-900">
        Name: {user.fullName ? user.fullName : "new user"}
      </h3>
      <h3 className="text-lg my-2 sm:my-1 text-center sm:text-left font-medium tracking-tight text-gray-900">
        Email address: {user.email}
      </h3>

      <div className="border-t border-gray-200 px-2 py-6 sm:px-6">
        <p className="mt-0.5 text-xl  font-semibold mb-5">My Addresses:</p>

        {user.addresses.map((address, i) => (
          <div key={i}>
            {selectedEditIndex === i ? (
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleEdit(data, i);
                  reset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Address Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive order.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("fullName", {
                              required: "Full name is required",
                            })}
                            id="fullName"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", {
                              required: "Phone number is required",
                            })}
                            id="phone"
                            autoComplete="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street address is required",
                            })}
                            id="street"
                            autoComplete="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="state"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pincode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pincode", {
                              required: "pincode is required",
                            })}
                            id="pincode"
                            autoComplete="pincode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={() => setselectedEditIndex(-1)}
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>
              </form>
            ) : null}

            <div className="mb-8">
              <h3 className="text-xl pb-1">Address: {i + 1} </h3>
              <div className="flex  px-2 my-2 justify-between gap-x-6 py-3 border-solid border-2 border-gray-300 rounded-md">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm  font-semibold leading-6 text-gray-900">
                    FullName: {address.fullName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    <strong>Phone:</strong> {address.phone}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    <strong>address:</strong> {address.street}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    <strong>email:</strong> {address.email}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    <strong>city:</strong> {address.city}{" "}
                    <strong>pincode:</strong> {address.pincode}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    <strong>state:</strong> {address.state}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.pinCode}
                  </p>
                </div>
                <div className="flex flex-col justify-center">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => handleEditForm(i)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => handleRemove(i)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
