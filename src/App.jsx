import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route
                path="*"
                element={
                  <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                    <div className="text-6xl mb-4">🏓</div>
                    <h2 className="text-3xl font-black text-dark-900 mb-3">404 - 페이지를 찾을 수 없습니다</h2>
                    <p className="text-gray-500 mb-6">요청하신 페이지가 존재하지 않습니다.</p>
                    <a href="/" className="btn-primary">홈으로 돌아가기</a>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
          <Cart />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
