import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './component/Footer'
import Header from './component/Header'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './component/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/error/NotFound'

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
                <Route path="/products" element={<Products />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* call all catch  */}
                <Route path="*" element={<NotFound />} />
            </Routes>

        </div>
        <Footer />
    </>
  )
}

export default App
