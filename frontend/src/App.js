import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './component/Customer/Nav';
import Dashboard from './component/Admin/Dashboard';
import Addproduct from './component/Admin/Addproduct';
import DashboardDetail from './component/Admin/DashboardDetail';
import ProductManagement from './component/Admin/ProductManagement';
import CustomerManagement from './component/Admin/CustomerManagement';
import Product from './component/Customer/Product';
import ProductDetails from './component/Customer/ProductDetails';
import Privatecomponent from './component/Admin/privatecomponent';
import AdminLogin from './component/Admin/AdminLogin';
import PageNotFound from './component/PageNotFound';
import UserSignup from './component/Customer/UserSignup';
import UserLogin from './component/Customer/Userlogin';
import UserPrivate from './component/Customer/UserPrivate';
import UpdateProduct from './component/Admin/Updateproduct';
import Cart from './component/Customer/Cart';
function App() {

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes >
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/usersignup' element={<UserSignup />}></Route>
          <Route path='/userlogin' element={<UserLogin />}></Route>
          <Route path="*" element={<PageNotFound />} />
          
          <Route element={<UserPrivate />}>
            <Route path='/' element={<Product />}></Route>
            <Route path='/product' element={<h1>Login page</h1>}></Route>
            <Route path='/productdetail/:id' element={<ProductDetails />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Route>
          <Route element={<Privatecomponent />}>
              <Route path='/dashboard' element={<Dashboard />} >
                <Route path="addproduct/" element={<Addproduct />} />
                <Route path="updateproduct/:id" element={<UpdateProduct />} />
                <Route path="dashboarddetail" element={<DashboardDetail />} />
                <Route path="productmanagement" element={<ProductManagement />} />
                <Route path="customermanagement" element={<CustomerManagement />} />
                {/* <Route path="/*" component={<PageNotFound/>} /> */}
              </Route>
            </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
