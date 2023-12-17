import { Link } from "react-router-dom";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  updateCartItemAsync,
  deleteCartItemAsync,
} from "./cartSlice";

const Cart = () => {
  console.log('cart re-renders');
  const dispatch = useDispatch();
  let items = useSelector(selectItems);

  let totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  let totalItems = items.reduce((total, item) => item.quantity + total, 0);

  function handleSelectChange(e, id) {
    dispatch(
      updateCartItemAsync({ id, itemUpdate: { quantity: +e.target.value } })
    );
  }
  function handleItemRemove(e, id) {
    dispatch(deleteCartItemAsync(id));
  }

  return (
    <>
      <div className=" mx-auto mt-24 max-w-7xl px-2 sm:px-6 lg:px-8">
        <h1 className="text-4xl my-2 sm:my-1 text-center sm:text-left font-medium tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="border-t border-gray-200 px-1 py-6 sm:px-6">
      {items.length === 0 && <h3 className="text-3xl text-center font-semibold">No Items </h3> } 
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
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
                      <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Qty
                        <select
                          onChange={(e) => handleSelectChange(e, item.id)}
                          className="border ml-1  cursor-pointer"
                          name="Qty"
                          value={item.quantity}
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                        </select>
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => handleItemRemove(e, item.id)}
                        >
                          Remove
                        </button>
                      </div>
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
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total items in cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link title="Home" to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
