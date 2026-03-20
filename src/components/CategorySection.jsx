import React from 'react'
import { Link } from 'react-router-dom'
import { categories, getProductsByCategory } from '../data/products'
import ProductCard from './ProductCard'

const CategorySection = ({ categoryId, showAll = false }) => {
  const category = categories.find((c) => c.id === categoryId)
  const products = getProductsByCategory(categoryId).slice(0, showAll ? undefined : 4)

  if (!category) return null

  return (
    <section className="py-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{category.icon}</span>
            <h2 className="text-2xl font-black text-dark-900">{category.name}</h2>
          </div>
          <p className="text-sm text-gray-500 ml-9">{category.description}</p>
        </div>
        <Link
          to={`/products?category=${categoryId}`}
          className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group"
        >
          전체 보기
          <svg
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4 sm:hidden">
        <Link
          to={`/products?category=${categoryId}`}
          className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors text-sm"
        >
          {category.name} 전체 보기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default CategorySection
