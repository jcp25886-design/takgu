import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    id: 1,
    tag: '신제품 출시',
    title: '2024 시즌\n프로 라켓 컬렉션',
    subtitle: '세계 챔피언이 선택한 퍼포먼스, 이제 당신의 손에',
    cta: '지금 쇼핑하기',
    ctaLink: '/products?category=racket',
    bgFrom: 'from-dark-900',
    bgTo: 'to-dark-800',
    accent: 'text-primary-500',
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?w=800&h=600&fit=crop',
    badge: '최대 30% 할인',
  },
  {
    id: 2,
    tag: '여름 세일',
    title: '탁구 의류\n빅세일 시작!',
    subtitle: '프로처럼 입고, 프로처럼 플레이하세요',
    cta: '의류 보러가기',
    ctaLink: '/products?category=clothing',
    bgFrom: 'from-primary-700',
    bgTo: 'to-primary-900',
    accent: 'text-yellow-400',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    badge: '한정 수량',
  },
  {
    id: 3,
    tag: '베스트셀러',
    title: '테너지 05\n다시 입고!',
    subtitle: '전 세계 1위 러버, 지금 바로 만나보세요',
    cta: '러버 구매하기',
    ctaLink: '/products?category=rubber',
    bgFrom: 'from-dark-900',
    bgTo: 'to-primary-900',
    accent: 'text-white',
    image: 'https://images.unsplash.com/photo-1594623274890-6b45ce7cf44a?w=800&h=600&fit=crop',
    badge: '재고 한정',
  },
]

const Banner = () => {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [current])

  const goToSlide = (index) => {
    if (isAnimating || index === current) return
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToNext = () => {
    goToSlide((current + 1) % slides.length)
  }

  const goToPrev = () => {
    goToSlide((current - 1 + slides.length) % slides.length)
  }

  const slide = slides[current]

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${slide.bgFrom} ${slide.bgTo} transition-all duration-700`}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Content */}
          <div className="flex-1 text-white z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {slide.tag}
              </span>
              <span className={`text-sm font-semibold ${slide.accent}`}>
                {slide.badge}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-md">
              {slide.subtitle}
            </p>
            <div className="flex gap-3">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-primary-900/30"
              >
                {slide.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/20"
              >
                전체 보기
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-10 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-black text-white">500+</p>
                <p className="text-xs text-gray-400">상품 보유</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-2xl font-black text-white">10만+</p>
                <p className="text-xs text-gray-400">누적 고객</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-2xl font-black text-white">4.9★</p>
                <p className="text-xs text-gray-400">평균 평점</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md">
              <div className="absolute inset-0 bg-primary-600/20 rounded-3xl blur-3xl" />
              <img
                src={slide.image}
                alt={slide.title}
                className="relative w-full h-56 md:h-80 object-cover rounded-2xl shadow-2xl"
              />
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary-600 text-white rounded-2xl p-3 shadow-xl">
                <p className="text-xs font-semibold">무료배송</p>
                <p className="text-lg font-black">5만원↑</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2.5 bg-primary-500'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors border border-white/20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors border border-white/20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}

export default Banner
