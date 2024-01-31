import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import Products from "../features/products/components/Products";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
};

export default HomePage;
