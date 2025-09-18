import React from 'react';
import { 
  FaFacebookF, 
  FaYoutube, 
  FaTwitter, 
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
  FaTiktok
} from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-primary-gold mb-4">
              Tiếng nói của công nhân: Sứ mệnh và khát vọng
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Giai cấp công nhân Việt Nam, với tinh thần cách mạng sâu sắc, đã phát triển mạnh mẽ trong thời kỳ đổi mới, đóng vai trò quan trọng trong công nghiệp hóa, hiện đại hóa đất nước. 
              Sứ mệnh của họ là phát triển kinh tế, bảo vệ Đảng và chế độ xã hội chủ nghĩa, đồng thời xây dựng nền văn hóa xã hội chủ nghĩa. 
              Đảng Cộng sản Việt Nam đề ra các giải pháp như trí thức hóa công nhân, nâng cao đời sống cho người lao động.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61580547878635" 
                className="w-10 h-10 bg-primary-red hover:bg-primary-gold rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              {/* <a 
                href="#" 
                className="w-10 h-10 bg-primary-red hover:bg-primary-gold rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a> */}
              {/* <a 
                href="#" 
                className="w-10 h-10 bg-primary-red hover:bg-primary-gold rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <FaTiktok />
              </a> */}
              <a 
                href="https://www.instagram.com/triethocmaclenin_" 
                className="w-10 h-10 bg-primary-red hover:bg-primary-gold rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-primary-gold mb-6">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Trang chủ', href: '#home' },
                { label: 'Tổng quan', href: '#overview' },
                { label: 'Nội dung', href: '#thoughts' },
                { label: 'Phân tích', href: '#analysis' },
                { label: 'Nghị quyết', href: '#timeline' }
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.href.substring(1));
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-gray-300 hover:text-primary-gold transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-primary-gold mb-6">
              Thông tin liên hệ
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-primary-gold flex-shrink-0" />
                <span>Việt Nam</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-primary-gold flex-shrink-0" />
                <span>nguyentrungnam01n@gmail.com.vn</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-primary-gold flex-shrink-0" />
                <span>(+84) 944 056 171</span>
              </div>
            </div>

            <div className="mt-8">
              <h5 className="font-semibold text-primary-gold mb-3">Giờ mở cửa</h5>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                <p>Thứ 7 - Chủ nhật: 8:00 - 16:00</p>
                <p>Nghỉ các ngày lễ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">
                &copy; 2024 Tiếng nói của công nhân: Sứ mệnh và khát vọng. Bảo lưu mọi quyền.
              </p>
            </div>
            <div className="flex space-x-6">
              <button className="text-gray-400 hover:text-primary-gold transition-colors duration-300">
                Chính sách bảo mật
              </button>
              <button className="text-gray-400 hover:text-primary-gold transition-colors duration-300">
                Điều khoản sử dụng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {/* <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-red hover:bg-primary-gold text-white rounded-full flex items-center justify-center shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 z-50"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button> */}
    </footer>
  );
};

export default Footer;
