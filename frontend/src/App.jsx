import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/user/profile";
import UserOrders from "./pages/user/UserOrders";
import OrderDetails from "./pages/user/OrderDetails";
import NotFound from "./pages/NotFound";
import EditProduct from "./pages/admin/EditProduct";
import AddProduct from "./pages/admin/AddProduct";
import Dashboard from "./pages/admin/Dashbord";
import AdminProducts from "./pages/admin/AdminProduct";
import AdminOrders from "./pages/admin/Orders";
import AllUsers from "./pages/admin/AllUsers";
import Logout from "./pages/Logout";
import CheckOut from "./pages/user/Checkout";
import OrderSuccess from "./pages/user/orderSuccess";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<UserOrders />} />
          <Route path="/my-orders/:id" element={<OrderDetails />} />
          <Route path="admin/add-product" element={<AddProduct />} />
          <Route path="admin/edit-products/:id" element={<EditProduct />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/users" element={<AllUsers />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/checkout/:id" element={<CheckOut />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

      </Routes>
    </>



  )
};

export default App;