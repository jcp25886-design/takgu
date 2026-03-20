import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const CartItem = ({ item }) => {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <Link to={`/products/${item.id}`} className="flex-shrink-0">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.id}`}>
          <p className="text-sm font-semibold text-dark-900 line-clamp-2 hover:text-primary-600 transition-colors leading-snug">
            {item.name}
          </p>
        </Link>
        <p className="text-primary-600 font-bold text-sm mt-1">
          {formatPrice(item.price)}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-bold text-lg leading-none"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold text-dark-900">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-bold text-lg leading-none"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const Cart = () => {
  const { items, totalItems, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  const shippingFee = totalPrice >= 50000 ? 0 : 3000
  const finalTotal = totalPrice + shippingFee

  if (!isCartOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-lg font-black text-dark-900">장바구니</h2>
            {totalItems > 0 && (
              <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto cart-scroll px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-dark-900 mb-1">장바구니가 비어있습니다</p>
                <p className="text-sm text-gray-400">마음에 드는 상품을 담아보세요!</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary text-sm"
              >
                쇼핑 계속하기
              </button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-4 bg-gray-50">
            {/* Free shipping notice */}
            {totalPrice < 50000 && (
              <div className="mb-3 p-3 bg-primary-50 rounded-lg">
                <p className="text-xs text-primary-700 font-medium">
                  {formatPrice(50000 - totalPrice)} 더 담으면 <strong>무료배송!</strong>
                </p>
                <div className="mt-2 bg-primary-200 rounded-full h-1.5">
                  <div
                    className="bg-primary-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min((totalPrice / 50000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {totalPrice >= 50000 && (
              <div className="mb-3 p-2 bg-green-50 rounded-lg flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xs text-green-700 font-medium">무료배송 적용됩니다!</p>
              </div>
            )}

            {/* Price summary */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>상품금액</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>배송비</span>
                <span className={shippingFee === 0 ? 'text-green-600 font-semibold' : ''}>
                  {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between font-black text-dark-900 text-base pt-2 border-t border-gray-200">
                <span>총 결제금액</span>
                <span className="text-primary-600">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="flex-shrink-0 px-3 py-3 rounded-xl border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors text-xs font-medium"
              >
                비우기
              </button>
              <button
                onClick={() => {
                  alert('결제 기능은 준비 중입니다! 🏓')
                }}
                className="flex-1 btn-primary py-3 rounded-xl text-base"
              >
                주문하기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
