"use client";



export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-6 text-gray-400 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Company name and address */}
          <div className="text-center md:text-left">
            <div className="text-white font-bold text-lg">GLOBAL STAR AUTO</div>
            <div className="text-gray-400 text-sm mt-1">Владивосток, ул. Авроровская, д. 10</div>
          </div>

          {/* Contact & Social */}
          <div className="flex items-center space-x-6">
            <a
              href="tel:+74999559671"
              className="text-white hover:text-blue-400 font-medium transition-colors duration-300"
            >
              +7 (499) 955-96-71
            </a>
            <div className="flex space-x-3">
              <a
                href="https://t.me/gsat_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-8 h-8 rounded-xl bg-blue-500/20 hover:bg-blue-500 flex items-center justify-center transition-all duration-300"
              >
                <img 
                  src="/uploads/tg.png" 
                  alt="Telegram" 
                  className="w-4 h-4" 
                />
              </a>
              <a
                href="https://wa.me/79823258220"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-8 h-8 rounded-xl bg-green-500/20 hover:bg-green-500 flex items-center justify-center transition-all duration-300"
              >
                <img 
                  src="/uploads/whatsapp.png" 
                  alt="WhatsApp" 
                  className="w-4 h-4" 
                />
              </a>
            </div>
          </div>

          {/* Copyright only */}
          <div className="flex flex-col items-center md:items-end">
            <div className="text-xs opacity-75">© {year} GLOBAL STAR AUTO</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
