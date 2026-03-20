import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const StarRating = ({ rating, count }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  )
}

const ProductCard = ({ product }) => {
  const { addItem } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addItem(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="card border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  product.badgeType === 'red'
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-900 text-white'
                }`}
              >
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-yellow-400 text-dark-900">
                -{discount}%
              </span>
            )}
            {!product.inStock && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-gray-500 text-white">
                품절
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
          >
            <svg
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'text-primary-600 fill-primary-600' : 'text-gray-400'
              }`}
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-2.5 text-sm font-bold transition-colors ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : product.inStock
                  ? 'bg-dark-900 hover:bg-primary-600 text-white'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              {addedToCart ? '✓ 담겼습니다!' : product.inStock ? '장바구니 담기' : '품절'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-gray-400 mb-1 capitalize">
            {{ racket: '라켓', rubber: '러버', ball: '공', clothing: '의류' }[product.category]}
          </p>
          <h3 className="font-semibold text-dark-900 text-sm line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="mt-2 flex items-center gap-2">
            <span className="font-black text-dark-900 text-base">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
