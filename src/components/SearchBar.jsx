import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchProducts } from '../data/products'

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowResults(false)
        if (onClose) onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    if (val.trim().length > 0) {
      const found = searchProducts(val).slice(0, 5)
      setResults(found)
      setShowResults(true)
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
      setShowResults(false)
      if (onClose) onClose()
    }
  }

  const handleResultClick = (product) => {
    navigate(`/products/${product.id}`)
    setShowResults(false)
    if (onClose) onClose()
  }

  const categoryMap = { racket: '라켓', rubber: '러버', ball: '공', clothing: '의류' }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="라켓, 러버, 공, 의류 검색..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-600 focus:outline-none text-dark-900 text-base transition-colors"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleResultClick(product)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-dark-900 text-sm truncate">{product.name}</p>
                <p className="text-xs text-gray-500">{categoryMap[product.category]}</p>
              </div>
              <span className="text-primary-600 font-bold text-sm flex-shrink-0">
                {new Intl.NumberFormat('ko-KR').format(product.price)}원
              </span>
            </button>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-3 bg-gray-50 text-primary-600 font-semibold text-sm hover:bg-primary-50 transition-colors border-t border-gray-100"
          >
            "{query}" 전체 결과 보기 →
          </button>
        </div>
      )}

      {showResults && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-6 text-center animate-fade-in">
          <p className="text-gray-500 text-sm">"{query}"에 대한 검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
