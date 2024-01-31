import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../orders/orderSlice";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [editableOrderId, seteditableOrderId] = useState(-1);
  const [sort, setsort] = useState({ _sort: "id", _order: "asc" });

  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  //all product fetching by filters also
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  function handleEdit(order) {
    seteditableOrderId(order.id);
  }

  function handleShow(order) {}

  function handlePage(page) {
    setpage(page);
  }

  function handleSort(option) {
    let sort = { _sort: option.sort, _order: option.order };
    console.log(sort);
    setsort(sort);
  }

  function handleUpdate(e, order) {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    seteditableOrderId(-1);
  }

  function chooseColor(status) {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  }

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto ">
        <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full lg:w-11/12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 cursor-pointer bg-red-400 px-6 text-left"
                      title="Sort by Id"
                      onClick={() =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#{" "}
                      {sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 cursor-pointer bg-red-400 text-center"
                      title="Sort by Amount"
                      onClick={() =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount {" "}
                      {sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order?.items?.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span>
                              {item.title} - {item.quantity} items -{" "}
                              {discountedPrice(item)} price
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div>
                          <div>
                            <strong>{order?.selectedAddress?.fullName}</strong>,{" "}
                          </div>
                          <div>{order?.selectedAddress?.street}, </div>
                          <div>{order?.selectedAddress?.city}, </div>
                          <div>{order?.selectedAddress?.state}, </div>
                          <div>{order?.selectedAddress?.pincode}, </div>
                          <div>{order?.selectedAddress?.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            autoFocus
                            className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
                            onChange={(e) => handleUpdate(e, order)}
                          >
                            <option
                              style={{ display: "none" }}
                              className="bg-slate-50"
                              value=""
                            >
                              Status
                            </option>
                            <option className="bg-slate-50" value="pending">
                              Pending
                            </option>
                            <option className="bg-slate-50" value="dispatched">
                              Dispatched
                            </option>
                            <option className="bg-slate-50" value="delivered">
                              Delivered
                            </option>
                            <option className="bg-slate-50" value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-3 transform hover:text-purple-500 hover:scale-120">
                            <EyeIcon
                              className="w-6 h-6 cursor-pointer"
                              onClick={() => handleShow(order)}
                            />
                          </div>
                          <div className="w-6 transform hover:text-purple-500 hover:scale-120">
                            <PencilIcon
                              className="h-6 w-6 cursor-pointer"
                              onClick={() => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        page={page}
        setpage={setpage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </>
  );
};

export default AdminOrders;
