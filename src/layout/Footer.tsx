import { Film, Phone, Youtube, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
      <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and App Downloads */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                BILT <span className="text-red-500">TICK</span>
              </span>
              </div>

              {/* App Store Buttons */}
              <div className="space-y-3">
                <a
                    href="#"
                    className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg px-4 py-3 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">СКАЧАТЬ ИЗ</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Google Play</div>
                  </div>
                </a>

                <a
                    href="#"
                    className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg px-4 py-3 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">ЗАГРУЗИТЬ В</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            {/* О нас */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">О нас</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <div className="w-5 h-5 border border-red-500 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded"></div>
                    </div>
                    <span className="text-sm">Публичная оферта</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </div>
                    <span className="text-sm">Реклама</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6"/>
                      </svg>
                    </div>
                    <span className="text-sm">F.A.Q</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span className="text-sm">Контакты</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Категории */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Категории</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <div className="w-5 h-5 border border-red-500 rounded flex items-center justify-center">
                      <Film className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-sm">Кино</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <div className="w-5 h-5 border border-red-500 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z"/>
                      </svg>
                    </div>
                    <span className="text-sm">Театр</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17Z"/>
                      </svg>
                    </div>
                    <span className="text-sm">Концерты</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8M10,17L16,11L13,8L7,14V17H10Z"/>
                      </svg>
                    </div>
                    <span className="text-sm">Спорт</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Связаться с нами */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Связаться с нами</h3>
              <div className="space-y-4">
                <a
                    href="tel:+998068973338"
                    className="block text-red-500 hover:text-red-400 transition-colors duration-200 font-medium"
                >
                  +998 (06) 897-33-38
                </a>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Социальные сети</h4>
                  <div className="flex space-x-3">
                    <a
                        href="#"
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 dark:hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    >
                      <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 dark:hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    >
                      <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 dark:hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                    >
                      <Youtube className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; 2024 BILT TICK. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;