import AdminProductsList from "../features/admin/components/AdminProductsList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

export default function AdminProductsListPage() {
  return (
    <>
      <Navbar />
      <AdminProductsList />
      <Footer />
    </>
  );
}
