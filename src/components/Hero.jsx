import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Hero = () => {
  const images = [
    "/hero.jpg",
    "/banner_1.jpg",
    "/banner_2.jpg",
    "/banner_3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={src + index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden={index === currentIndex ? "false" : "true"}
          />
        ))}
      </div>

      {/* Overlay để làm mờ background và tăng độ tương phản cho text */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-red/30 to-primary-dark-red/30"></div>

      {/* Arrow Navigation */}
      <button
        type="button"
        aria-label="Ảnh trước"
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
      >
        <FaChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Ảnh tiếp theo"
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-colors"
      >
        <FaChevronRight />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Background cho text để tăng độ tương phản */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-shadow-lg">
              Tiếng nói của công nhân
              <br />
              <span className="text-gradient bg-gradient-to-r from-primary-gold to-primary-accent-yellow bg-clip-text text-transparent drop-shadow-lg">
                Sứ mệnh và khát vọng
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed text-shadow-md">
              “Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người
              xã hội chủ nghĩa. Trong đó, giai cấp công nhân phải là nòng cốt,
              là đội quân tiên phong.”
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection("thoughts")}
              className="btn-primary text-lg px-10 py-5"
            >
              Khám Phá Tư Tưởng
            </button>
            <button
              onClick={() => scrollToSection("analysis")}
              className="btn-secondary text-lg px-10 py-5"
            >
              Đọc Phân Tích
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection("overview")}
          className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary-red transition-all duration-300 animate-bounce-slow"
        >
          <FaChevronDown />
        </button>
      </div>
    </section>
  );
};

export default Hero;
