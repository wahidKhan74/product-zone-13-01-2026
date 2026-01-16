import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './component/Footer'
import Header from './component/Header'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/error/NotFound'
import ProductsLayout from './component/products/ProductLayout'
import ProductList from './component/products/ProductList'
import ProductDetails from './component/products/ProductDetails'
import ProductReviews from './component/products/ProductReviews'
import ProductSpecs from './component/products/ProductSpecs'
import Dashboard from './component/Dashboard'
import AuthGuard from './component/auth/AuthGuard'
import Profile from './component/Profile'
import UnAuth from './pages/error/UnAuth'
import RoleGuard from './component/auth/RoleGuard'
import AdminDashboard from './component/AdminDashboard'

function App() {

  return (
    <>
        <Header />
        <Navbar />
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Main content goes here */}
            <Routes>
                {/* Define your routes here */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<UnAuth />} />

                // Protected routes
                <Route path="/dashboard" element={
                  <AuthGuard>
                      <RoleGuard allowedRoles={['admin', 'user']}>
                        <Dashboard />
                      </RoleGuard>
                  </AuthGuard>
                  } />

                  <Route path="/admin" element={
                  <AuthGuard>
                      <RoleGuard allowedRoles={['admin']}>
                        <AdminDashboard />
                      </RoleGuard>
                  </AuthGuard>
                  } />

                  <Route path="/profile" element={
                  <AuthGuard>
                      <RoleGuard allowedRoles={['user']}>
                        <Profile />
                      </RoleGuard>
                  </AuthGuard>
                  } />

                <Route path="/products/*" element={<ProductsLayout />} >
                    {/* Nested product routes */}
                    <Route index element={<ProductList />} />
                    <Route path=":id" element={<ProductDetails />} >
                      <Route path="reviews" element={<ProductReviews />} />
                      <Route path="specs" element={<ProductSpecs />} />
                    </Route>
                </Route>


                {/* call all catch  */}
                <Route path="*" element={<NotFound />} />
            </Routes>

        </div>
        <Footer />
    </>
  )
}

export default App
