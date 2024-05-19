import "./App.css";
import { Route, Routes } from "react-router-dom";
//layout
import CustomerLayout from "./layout/CustomerLayout/CustomerLayout";
import HomeLayout from "./layout/HomeLayout/HomeLayout";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import BusinessLayout from './layout/BusinessLayout/BusinessLayout'
//pages
import HomePage from "./pages/Home/HomePage/HomePage";
import Pricing from "./pages/Home/Pricing/Pricing";
import Contact from "./pages/Home/Contact/Contact";
import FAQ from "./pages/Home/FAQ/FAQ";
import Login from "./pages/Home/Login/Login";
import Signup from "./pages/Home/SignUp/SignUp";
import ForgotPassword from "./pages/Home/Password/Forgot";
import ResetPassword from "./pages/Home/Password/ResetPassword";
import VerifyCode from "./pages/Home/Password/VerifyCode";
import FillSignUp from "./pages/Home/FillSignUp/FillSignUp";
import InfoDetail from './pages/Home/InfoDetail/InfoDetail'
import Payment from "./pages/Home/Payment/Payment";

//admin page
import DashboardAdmin from "./pages/Admin/Dashboard/Dashboard";
import Product from "./pages/Admin/Product/Product";
import Customer from "./pages/Admin/Customer/Customer";
import Business from "./pages/Admin/Business/Business";

//business page
import CustomerList from "./pages/Business/CustomerList/CustomerList"
import CustomerInformation from "./pages/Business/CustomerInformation/CustomerInformation";
import OrderBusiness from "./pages/Business/Order/Order";
import Warehouse from "./pages/Business/Warehouse/Warehouse";
import ProductM from "./pages/Business/Product/ProductM";
import AddProduct from "./pages/Business/Product/AddProduct/AddProduct";
import DetailProduct from "./pages/Business/Product/DetailProduct/DetailProduct";
import BusinessHome from "./pages/Business/Home/BusinessHome";
import StaffList from "./pages/Business/Staff/StaffList";
import CustomerBlacklist from "./pages/Business/CustomerBlacklist/CustomerBlacklist"
import EditWebsite from "./pages/Business/Website/EditWebsite/EditWebsite";
import CategoryM from "./pages/Business/Category/CategoryM/CategoryM";
import ImportGoods from "./pages/Business/ImportGoods/ImportGoods";
import InfoShop from "./pages/Business/InfoShop/InfoShop";



//Customer
import Home from "./pages/Customer/Home/Home";
import DetailProductCustomer from "./pages/Customer/DetailProduct/DetailProduct";
import Address from "./pages/Customer/Address/Address";
import AddressEdit from "./pages/Customer/AddressEdit/AddressEdit";
import Checkout from "./pages/Customer/Checkout/Checkout";
import OrderCustomer from "./pages/Customer/OrderCustomer/OrderCustomer";
import DetailOrder from "./pages/Customer/DetailOrder/DetailOrder";
import Cart from "./pages/Customer/Cart/Cart";
import Shop from "./pages/Customer/Shop/Shop";
import Review from "./pages/Customer/Review/AddNewReview/AddNewReview"
import LoginCustomer from "./pages/Customer/LoginCustomer/LoginCustomer";
import SignupCustomer from "./pages/Customer/SignupCustomer/SignupCustomer";

//Error
import Error from "./pages/Error/Error";
import EditProduct from "./pages/Business/Product/EditProduct/EditProduct";
import AddNewAddress from "./pages/Customer/AddNewAddress/AddNewAddress";
import DetailOrderBusiness from "./pages/Business/Order/DetailOrder/DetailOrder";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="FAQ" element={<FAQ />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup/fill" element={<FillSignUp />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="verifycode" element={<VerifyCode />} />
          <Route path="resetpass" element={<ResetPassword />} />
          <Route path="payment" element={<Payment />} />
          <Route path="infodetail" element={<InfoDetail />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="product" element={<Product />} />
          <Route path="customer" element={<Customer />} />
          <Route path="business" element={<Business />} />
        </Route>

        <Route path="/:tenatURL/business" element={<BusinessLayout />}>
          <Route index element={<BusinessHome />} />
          <Route path="item" element={<DashboardAdmin />} />
          <Route path="transaction" element={<DashboardAdmin />} />
          <Route path="customer" element={<CustomerList />} />
          <Route path="employee" element={<StaffList />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="product" element={<ProductM />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="product/detail/:id" element={<DetailProduct />} />
          <Route path="customer-information" element={<CustomerInformation />} />
          <Route path="order" element={<OrderBusiness />} />
          <Route path="order/:id" element={<DetailOrderBusiness />} />
          <Route path="customer-blacklist" element={<CustomerBlacklist />} />
          <Route path="website" element={<EditWebsite />} />
          <Route path="category" element={<CategoryM />} />
          <Route path="import-goods" element={<ImportGoods />} />
          <Route path="info-shop" element={<InfoShop />} />
        </Route>

        <Route path="/:tenantURL/customer" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="detail-product/:id" element={<DetailProductCustomer />} />
          <Route path="address" element={<Address />} />
          <Route path="address-edit" element={<AddressEdit />} />
          <Route path="address-addnew" element={<AddNewAddress />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order" element={<OrderCustomer />} />
          <Route path="detail-order" element={<DetailOrder />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Shop />} />
          <Route path="review/:id" element={<Review />} />
          <Route path="login" element={<LoginCustomer />} />
          <Route path="signup" element={<SignupCustomer />} />
        </Route>

        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
