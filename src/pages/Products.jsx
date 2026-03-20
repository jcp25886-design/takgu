import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { products, categories, searchProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'

const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'price-asc', label: '낮은 가격순' },
  { value: 'price-desc', label: '높은 가격순' },
  { value: 'rating', label: '평점순' },
  { value: 'newest', label: '최신순' },
]

const categoryMap = { racket: '라켓', rubber: '러버', ball: '공', clothing: '의류' }

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const categoryFilter = searchParams.get('category') || 'all'
  const searchQuery = searchParams.get('search') || ''

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [categoryFilter])

  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : [...products]

    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter)
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        break
    }

    return result
  }, [categoryFilter, searchQuery, sort])

  const handleCategoryChange = (catId) => {
    const params = new URLSearchParams()
    if (catId !== 'all') params.set('category', catId)
    if (searchQuery) params.set('search', searchQuery)
    setSearchParams(params)
  }

  const handleClearSearch = () => {
    const params = new URLSearchParams()
    if (categoryFilter !== 'all') params.set('category', categoryFilter)
    setSearchParams(params)
  }

  const pageTitle = searchQuery
    ? `"${searchQuery}" 검색 결과`
    : categoryFilter !== 'all'
    ? `${categoryMap[categoryFilter] || categoryFilter}`
    : '전체 상품'

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600 transition-colors">홈</Link>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-dark-900 font-medium">{pageTitle}</span>
      </nav>

      {/* Search bar */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Search query indicator */}
      {searchQuery && (
        <div className="mb-4 flex items-center gap-3 p-3 bg-primary-50 rounded-xl border border-primary-100">
          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-sm text-primary-700 font-medium flex-1">
            <strong>"{searchQuery}"</strong> 검색 결과 {filteredProducts.length}개
          </p>
          <button
            onClick={handleClearSearch}
            className="text-xs text-primary-600 hover:text-primary-800 font-semibold flex items-center gap-1"
          >
            지우기
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            categoryFilter === 'all'
              ? 'bg-dark-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          전체 ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                categoryFilter === cat.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Sort & count row */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <p className="text-sm text-gray-500 flex-shrink-0">
          <span className="font-bold text-dark-900">{filteredProducts.length}</span>개 상품
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-400 bg-white text-dark-900"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-dark-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500 mb-6">다른 검색어나 카테고리를 시도해보세요.</p>
          <Link to="/products" className="btn-primary">
            전체 상품 보기
          </Link>
        </div>
      )}
    </div>
  )
}

export default Products
