'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Menu, X, Phone, Send } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="z-50 fixed inset-x-0 top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 transition-all duration-500">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <div>
              <div className="text-white text-xl font-bold tracking-wide">
                GLOBALSTARAUTO
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                AUTO
              </div>
            </div>
          </Link>

          {/* Rating */}
          <div className="hidden lg:flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700">
            <StarRating sizeClass="w-4 h-4" />
            <div className="text-white font-semibold">4.9</div>
            <div className="text-gray-300 text-sm">рейтинг в Яндекс</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#calc"
              className="text-gray-300 hover:text-white font-medium tracking-wide transition-all duration-300 hover:bg-gray-800/50 px-4 py-2 rounded-lg"
            >
              КАТАЛОГ
            </Link>
            <Link
              href="#work"
              className="text-gray-300 hover:text-white font-medium tracking-wide transition-all duration-300 hover:bg-gray-800/50 px-4 py-2 rounded-lg"
            >
              ЭТАПЫ РАБОТЫ
            </Link>
            <Link
              href="#contacts"
              className="text-gray-300 hover:text-white font-medium tracking-wide transition-all duration-300 hover:bg-gray-800/50 px-4 py-2 rounded-lg"
            >
              КОНТАКТЫ
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Phone */}
            <a
              href="tel:+74996477787"
              className="hidden lg:flex items-center space-x-2 text-white hover:text-blue-400 transition-colors group"
            >
              <Phone className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-semibold text-lg tracking-wide">8 499 647-77-87</span>
            </a>

            {/* Social buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="https://t.me/globalstarauto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <Send className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/79654128726"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              >
                <span className="text-white font-bold text-sm">W</span>
              </a>
            </div>

            {/* CTA Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hidden md:block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 border-0">
                  ОБРАТНЫЙ ЗВОНОК
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Заказать обратный звонок
                  </h3>
                  <form className="space-y-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:outline-none transition-colors text-lg"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="+7 (999) 999-99-99"
                        className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:outline-none transition-colors text-lg"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl shadow-lg border-0 text-lg">
                      Заказать звонок
                    </Button>
                  </form>
                </div>
              </DialogContent>
            </Dialog>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-700 bg-gray-900/95 backdrop-blur-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#calc"
                className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                КАТАЛОГ
              </Link>
              <Link
                href="#work"
                className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                ЭТАПЫ РАБОТЫ
              </Link>
              <Link
                href="#contacts"
                className="text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                КОНТАКТЫ
              </Link>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <a href="tel:+74996477787" className="text-white font-semibold">
                  8 499 647-77-87
                </a>
                <div className="flex space-x-3">
                  <a
                    href="https://t.me/globalstarauto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://wa.me/79654128726"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-sm">W</span>
                  </a>
                </div>
              </div>

              <Button className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl border-0">
                ОБРАТНЫЙ ЗВОНОК
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
