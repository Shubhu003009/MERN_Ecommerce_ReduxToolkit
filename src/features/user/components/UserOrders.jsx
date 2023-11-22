import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className=" mx-auto mt-16 max-w-7xl px-2 sm:px-6 lg:px-8"
        >
          <h3 className="text-3xl my-2 sm:my-1 text-center sm:text-left font-medium tracking-tight text-gray-900">
            Order #{order.id}
          </h3>
          <h3 className="text-lg my-2 sm:my-1 text-center sm:text-left font-medium tracking-tight text-gray-900">
            Order Status: {order.status}
          </h3>
          <div className="border-t border-gray-200 px-1 py-6 sm:px-6">
            {order.items.length === 0 && (
              <h3 className="text-3xl text-center font-semibold">No Items </h3>
            )}
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.title}</a>
                          </h3>
                          <p className="ml-4">{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-2 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total items in cart</p>
              <p> {order.totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping Address:</p>

            <div className="flex  px-2 my-2 justify-between gap-x-6 py-5 border-solid border-2 border-gray-300 rounded-md">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {order.selectedAddress.fullName}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>Phone:</strong> {order.selectedAddress.phone}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>address:</strong> {order.selectedAddress.street}
                </p>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>email:</strong> {order.selectedAddress.email}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>city:</strong> {order.selectedAddress.city}{" "}
                  <strong>pincode:</strong> {order.selectedAddress.pincode}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  <strong>state:</strong> {order.selectedAddress.state}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {order.selectedAddress.pinCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
