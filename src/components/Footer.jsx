import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const categories = [
    { label: '라켓', to: '/products?category=racket' },
    { label: '러버', to: '/products?category=rubber' },
    { label: '공', to: '/products?category=ball' },
    { label: '의류', to: '/products?category=clothing' },
  ]

  const support = [
    { label: '공지사항', to: '#' },
    { label: '자주 묻는 질문', to: '#' },
    { label: '배송 안내', to: '#' },
    { label: '교환/반품 정책', to: '#' },
    { label: '1:1 문의', to: '#' },
  ]

  return (
    <footer className="bg-dark-900 text-gray-400 mt-16">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black text-lg">
                탁
              </div>
              <div>
                <span className="text-lg font-black text-white">탁구왕</span>
                <span className="text-xs text-gray-500 block leading-none -mt-0.5">TAKGUWANG</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              국내 최대 탁구 전문 쇼핑몰.<br />
              최고의 장비로 최고의 플레이를 경험하세요.
            </p>
            <div className="flex gap-3">
              {['인스타', '유튜브', '카카오'].map((social) => (
                <button
                  key={social}
                  className="w-9 h-9 bg-dark-800 hover:bg-primary-600 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">카테고리</h3>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className="text-sm hover:text-primary-400 transition-colors">
                  전체 상품
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">고객지원</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.label}>
                  <a href={item.to} className="text-sm hover:text-primary-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">연락처</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">고객센터</p>
                <p className="text-white font-bold text-lg">1588-0000</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">운영시간</p>
                <p>평일 09:00 ~ 18:00</p>
                <p className="text-xs">(주말/공휴일 휴무)</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">이메일</p>
                <p>help@takguwang.kr</p>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-2 p-3 bg-dark-800 rounded-lg">
                  <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <div>
                    <p className="text-white text-xs font-semibold">무료배송</p>
                    <p className="text-gray-400 text-xs">50,000원 이상 구매 시</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {currentYear} 탁구왕(TAKGUWANG). 모든 권리 보유.
          </p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-gray-300 transition-colors">이용약관</a>
            <a href="#" className="hover:text-gray-300 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-300 transition-colors">사업자정보</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
