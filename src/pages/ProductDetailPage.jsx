import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/products/components/ProductDetails";

const ProductDetailPage = () => {
  return (
    <div className="ProductDetailPage">
      <Navbar />
      <ProductDetails />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
