import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/Components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useEffect } from "react";
import PageNotFound from "./pages/PageNotFound";
import { UserOrderPage } from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import OrderSuccess from "./pages/orderSuccess";
import { selectLoggedInUser } from "./features/auth/authSlice";
import Logout from "./features/auth/Components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProtected from "./features/auth/Components/AdminProtected";
import AdminProductsListPage from "./pages/AdminProductsListPage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "admin",
    element: (
      <AdminProtected>
        <AdminProductsListPage />
      </AdminProtected>
    ),
  },
  {
    path: "admin/productDetail/:id",
    element: (
      <AdminProtected>
        <AdminProductDetailsPage />
      </AdminProtected>
    ),
  },
  {
    path: "admin/productForm",
    element: (
      <AdminProtected>
        <AdminProductFormPage />
      </AdminProtected>
    ),
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "ForgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "productDetail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "orderSuccess/:id",
    element: <OrderSuccess />,
  },
  {
    path: "orders",
    element: <UserOrderPage />,
  },
  {
    path: "profile",
    element: <UserProfilePage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
