import AdminOrders from "../features/admin/components/AdminOrders";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

export default function AdminOrdersPage() {
  return (
    <>
      <Navbar />
      <AdminOrders />
      <Footer />
    </>
  );
}
