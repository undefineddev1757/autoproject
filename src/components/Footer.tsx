"use client"

import { Send, MessageCircle } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="container mx-auto px-6 text-center space-y-6">
        <div className="flex justify-center items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <span className="text-white font-bold text-xl">GLOBALSTARAUTO</span>
        </div>

        <div className="flex justify-center space-x-4">
          <a href="tel:+74996477787" className="text-white hover:text-blue-400">
            8 499 647-77-87
          </a>
          <a
            href="https://t.me/globalstarauto"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Send className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/79654128726"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        <StarRating className="justify-center" sizeClass="w-4 h-4" />

        <div className="text-xs opacity-75">© {year} GLOBALSTARAUTO. Все права защищены.</div>
      </div>
    </footer>
  )
}
