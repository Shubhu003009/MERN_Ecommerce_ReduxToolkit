import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/userOrders";

export const UserOrderPage = () => {
  return (
    <>
      <Navbar />
      <h3 className="text-3xl font-bold text-center mt-5">My Orders</h3>
      <UserOrders />
    </>
  );
};
