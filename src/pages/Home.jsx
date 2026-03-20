import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'
import CategorySection from '../components/CategorySection'
import { categories, products } from '../data/products'

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3 text-2xl">
      {icon}
    </div>
    <h3 className="font-bold text-dark-900 mb-1 text-sm">{title}</h3>
    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
  </div>
)

const Home = () => {
  const featuredProducts = products.filter((p) => p.badge === '베스트셀러')

  return (
    <div>
      <Banner />

      {/* Features strip */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FeatureCard icon="🚚" title="무료배송" desc="5만원 이상 구매 시 전국 무료배송" />
            <FeatureCard icon="🔄" title="간편 교환/반품" desc="30일 이내 무료 교환 및 반품" />
            <FeatureCard icon="🛡️" title="정품 보증" desc="100% 정품만 취급하는 공식 판매점" />
            <FeatureCard icon="⭐" title="전문가 상담" desc="탁구 전문가가 직접 상품을 추천해 드립니다" />
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-dark-900 mb-2">카테고리</h2>
            <p className="text-gray-500">원하는 탁구 용품을 카테고리별로 찾아보세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group relative overflow-hidden bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center aspect-square hover:from-primary-700 hover:to-primary-900 transition-all duration-300"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </span>
                <h3 className="text-white font-black text-xl">{cat.name}</h3>
                <p className="text-gray-400 group-hover:text-gray-200 text-xs mt-1 transition-colors hidden sm:block">
                  {cat.description}
                </p>
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product sections */}
      <div className="max-w-7xl mx-auto px-4">
        <CategorySection categoryId="racket" />
        <div className="h-px bg-gray-100 my-4" />
        <CategorySection categoryId="rubber" />
        <div className="h-px bg-gray-100 my-4" />
        <CategorySection categoryId="ball" />
        <div className="h-px bg-gray-100 my-4" />
        <CategorySection categoryId="clothing" />
      </div>

      {/* CTA Banner */}
      <section className="mt-16 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-primary-400 font-semibold mb-2 text-sm uppercase tracking-widest">
            지금 바로 시작하세요
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            당신의 탁구 실력을<br />한 단계 높여드립니다
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            탁구왕에서 최고의 탁구 용품을 만나보세요. 전문가가 엄선한 제품들로 당신의 게임을 완성시켜 드립니다.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-primary-900/40 text-lg"
          >
            쇼핑 시작하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
