import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

export const UserOrderPage = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 min-h-screen" >
        <h3 className="text-2xl font-bold mt-5">My Orders</h3>
        <UserOrders />
      </div>
      <Footer />
    </>
  );
};
