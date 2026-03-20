import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, getProductsByCategory, formatPrice, categories } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const StarRating = ({ rating, count, large }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${large ? 'w-5 h-5' : 'w-4 h-4'} ${
            star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className={`font-bold text-dark-900 ${large ? 'text-lg' : 'text-sm'}`}>{rating}</span>
    <span className={`text-gray-400 ${large ? 'text-sm' : 'text-xs'}`}>({count}개 리뷰)</span>
  </div>
)

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, setIsCartOpen } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('info')

  const product = getProductById(id)

  useEffect(() => {
    window.scrollTo(0, 0)
    setQuantity(1)
    setAddedToCart(false)
  }, [id])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">😢</div>
        <h2 className="text-2xl font-black text-dark-900 mb-3">상품을 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-6">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
        <Link to="/products" className="btn-primary">
          전체 상품 보기
        </Link>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const categoryLabel = { racket: '라켓', rubber: '러버', ball: '공', clothing: '의류' }

  const handleAddToCart = () => {
    if (!product.inStock) return
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleBuyNow = () => {
    if (!product.inStock) return
    addItem(product)
    setIsCartOpen(true)
  }

  const tabs = [
    { id: 'info', label: '상품 정보' },
    { id: 'specs', label: '스펙' },
    { id: 'review', label: `리뷰 (${product.reviewCount})` },
    { id: 'shipping', label: '배송/교환' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary-600 transition-colors">홈</Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link
          to={`/products?category=${product.category}`}
          className="hover:text-primary-600 transition-colors"
        >
          {categoryLabel[product.category]}
        </Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-dark-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Product main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badge && (
              <span
                className={`text-sm font-bold px-3 py-1 rounded-lg ${
                  product.badgeType === 'red'
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-900 text-white'
                }`}
              >
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="text-sm font-bold px-3 py-1 rounded-lg bg-yellow-400 text-dark-900">
                -{discount}% 할인
              </span>
            )}
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <span className="bg-white text-dark-900 font-black text-xl px-6 py-3 rounded-xl">
                품절
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 font-medium mb-2">
            {categoryLabel[product.category]}
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-dark-900 mb-3 leading-tight">
            {product.name}
          </h1>

          <StarRating rating={product.rating} count={product.reviewCount} large />

          <div className="flex items-center gap-3 mt-4 mb-2">
            <span className="text-3xl font-black text-dark-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {discount && (
            <p className="text-primary-600 font-bold text-sm mb-4">
              {formatPrice(product.originalPrice - product.price)} 절약!
            </p>
          )}

          <p className="text-gray-600 text-sm leading-relaxed mb-6 border-t border-gray-100 pt-4">
            {product.description}
          </p>

          {/* Specs preview */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-400 mb-0.5">{key}</p>
                <p className="text-sm font-bold text-dark-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Shipping info */}
          <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-xl mb-4">
            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-sm text-primary-700">
              <strong>5만원 이상 무료배송</strong> · 오늘 주문 시 내일 도착 예정
            </p>
          </div>

          {/* Quantity */}
          {product.inStock && (
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-semibold text-dark-900">수량</span>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-bold text-xl"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-dark-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-bold text-xl"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                합계: <strong className="text-primary-600">{formatPrice(product.price * quantity)}</strong>
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-3 rounded-xl border-2 transition-colors ${
                isWishlisted
                  ? 'border-primary-600 bg-primary-50 text-primary-600'
                  : 'border-gray-200 text-gray-400 hover:border-primary-300'
              }`}
            >
              <svg
                className="w-5 h-5"
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
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 py-3 rounded-xl font-bold text-base transition-all ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : product.inStock
                  ? 'bg-dark-900 hover:bg-dark-800 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addedToCart
                ? '✓ 장바구니에 담겼습니다!'
                : product.inStock
                ? '장바구니 담기'
                : '품절'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className={`flex-1 py-3 rounded-xl font-bold text-base transition-colors ${
                product.inStock
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              바로 구매
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-1 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-semibold flex-shrink-0 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-dark-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'info' && (
          <div className="prose max-w-none">
            <h3 className="text-lg font-bold text-dark-900 mb-3">상품 상세 설명</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-bold text-dark-900 mb-4">주요 특징</h4>
              <ul className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-primary-600 font-bold flex-shrink-0">•</span>
                    <span>
                      <strong>{key}:</strong> {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div>
            <h3 className="text-lg font-bold text-dark-900 mb-4">상세 스펙</h3>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <div className="w-1/3 px-4 py-3 font-semibold text-sm text-gray-600 border-r border-gray-200">
                    {key}
                  </div>
                  <div className="flex-1 px-4 py-3 text-sm text-dark-900">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div>
            <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl mb-6">
              <div className="text-center">
                <p className="text-5xl font-black text-dark-900">{product.rating}</p>
                <StarRating rating={product.rating} count={product.reviewCount} />
                <p className="text-xs text-gray-400 mt-1">총 {product.reviewCount}개 리뷰</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-4 text-right">{star}</span>
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-6">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Sample reviews */}
            {[
              { name: '김탁구', date: '2024.02.15', rating: 5, text: '정말 최고의 제품입니다! 사용감이 너무 좋고 품질도 뛰어나네요. 강력 추천합니다.' },
              { name: '이스포츠', date: '2024.02.10', rating: 5, text: '배송도 빠르고 제품도 정품 맞습니다. 실력 향상에 도움이 많이 됐어요!' },
              { name: '박핑퐁', date: '2024.01.28', rating: 4, text: '가격 대비 성능이 훌륭합니다. 다만 배송이 하루 늦었지만 제품은 만족스럽습니다.' },
            ].map((review, i) => (
              <div key={i} className="border-b border-gray-100 py-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <span className="font-semibold text-sm text-dark-900">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-4">
            {[
              {
                title: '배송 안내',
                icon: '🚚',
                items: [
                  '5만원 이상 구매 시 무료배송 (미만 시 배송비 3,000원)',
                  '오전 11시 이전 결제 완료 시 당일 발송',
                  '평균 1~2일 내 수령 가능 (제주/도서산간 추가 소요)',
                ],
              },
              {
                title: '교환/반품 안내',
                icon: '🔄',
                items: [
                  '수령 후 30일 이내 교환/반품 가능',
                  '단순 변심에 의한 반품 시 왕복 배송비 고객 부담',
                  '상품 불량/오배송 시 100% 무료 교환/반품',
                  '사용 후 제품, 태그 제거 시 교환/반품 불가',
                ],
              },
              {
                title: '주의사항',
                icon: '⚠️',
                items: [
                  '상품 이미지는 실제와 다를 수 있습니다',
                  '재고 소진 시 조기 품절될 수 있습니다',
                  '궁금하신 점은 고객센터(1588-0000)로 문의 주세요',
                ],
              },
            ].map((section) => (
              <div key={section.title} className="bg-gray-50 rounded-2xl p-5">
                <h4 className="font-bold text-dark-900 mb-3 flex items-center gap-2">
                  <span>{section.icon}</span>
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary-600 flex-shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-dark-900">관련 상품</h2>
            <Link
              to={`/products?category=${product.category}`}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              더 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail
