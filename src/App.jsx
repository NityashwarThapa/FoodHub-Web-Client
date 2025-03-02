import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Page404 from './Pages/404/Page404';
import Header from './components/Header';
import Signup from './Pages/Signup/Signup';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Pages/AdminPages/Dashboard';
import AdminSidebar from './components/AdminComponents/AdminSidebar';
import SingleProduct from './Pages/Product/SingleProduct';
import AllProducts from './Pages/Product/AllProducts';
import Cartpage from './Pages/Cartpage/Cartpage';
import Wishlist from './Pages/Wishlist/Wishlist';
import ProtectedAdminRoute from './components/AdminComponents/ProtectedAdminRoute';
import Category from './Pages/AdminPages/Category/Category';
import Product from './Pages/AdminPages/Product/Product';
import User from './Pages/AdminPages/User/User';
import Profile from './Pages/Profile/Profile';
import Footer from './components/Footer';
import About from './Pages/AboutUs/About';
import Orders from './Pages/AdminPages/Orders/Orders';
import AdminHeader from './components/AdminComponents/AdminHeader';
import AdminContact from './Pages/AdminPages/Contact/AdminContact';

function App() {

  const location = useLocation()

  return (
    <div className='bg-white dark:bg-black dark:text-white'>
      <AuthContextProvider>
        <Toaster />
        <div className='min-h-screen flex flex-col'>
          <Header />
          <AdminHeader />
          <div className={`flex-1  ${location.pathname.includes('dashboard') ? "flex" : ""}`}>
            <AdminSidebar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/about" element={<About />} />

              {/* <Route path="/cartpage" element={<Cartpage />} /> */}


              <Route
                path="/cartpage"
                element={
                  <ProtectedRoute>
                    <Cartpage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product" element={<AllProducts />} />
              <Route path="/product/:id" element={<SingleProduct />} />

              {/* 404 Page */}
              <Route path="*" element={<Page404 />} />


              {/* Admin Pages */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <Dashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/products"
                element={
                  <ProtectedAdminRoute>
                    <Product />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/category"
                element={
                  <ProtectedAdminRoute>
                    <Category />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/users"
                element={
                  <ProtectedAdminRoute>
                    <User />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/orders"
                element={
                  <ProtectedAdminRoute>
                    <Orders />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/contact"
                element={
                  <ProtectedAdminRoute>
                    <AdminContact />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
