import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "overview", "thoughts", "analysis", "timeline"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Trang Chủ" },
    { id: "overview", label: "Tổng Quan" },
    {
      id: "thoughts",
      label: "Nội dung",
      dropdown: [
        { id: "independence-socialism", label: "Đặc điểm" },
        { id: "party-state", label: "Sứ mệnh hiện nay" },
        { id: "unity", label: "Phương hướng - Giải pháp" },
      ],
    },
    { id: "analysis", label: "Phân Tích" },
    { id: "timeline", label: "Nghị Quyết" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/anh-la-co-viet-nam-1.jpg"
              alt="Quốc kỳ Việt Nam"
              className="w-16 h-10 object-cover border-2 border-primary-red shadow-sm"
            />
            <h2 className="text-xl font-serif font-bold text-primary-red vietnamese-text">
              Tiếng nói của công nhân: Sứ mệnh và khát vọng
            </h2>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.id} className="relative group">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-primary-red bg-primary-gold/10"
                      : "text-neutral-dark-gray hover:text-primary-red hover:bg-primary-light-gold/30"
                  }`}
                >
                  <span className="vietnamese-text">{item.label}</span>
                  {item.dropdown && <FaChevronDown className="text-xs" />}
                </button>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-soft opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-4">
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.id}
                          onClick={() => scrollToSection(dropdownItem.id)}
                          className="block w-full text-left px-4 py-2 rounded-lg text-neutral-dark-gray hover:text-primary-red hover:bg-primary-light-gold/30 transition-colors duration-200 vietnamese-text"
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-primary-red hover:bg-primary-gold/10 transition-colors duration-200"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 bg-white rounded-xl shadow-soft">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-6 py-3 transition-colors duration-200 vietnamese-text ${
                    activeSection === item.id
                      ? "text-primary-red bg-primary-gold/10"
                      : "text-neutral-dark-gray hover:text-primary-red hover:bg-primary-light-gold/30"
                  }`}
                >
                  {item.label}
                </button>

                {/* Mobile Dropdown */}
                {item.dropdown && (
                  <div className="pl-4 bg-neutral-light-gray/50">
                    {item.dropdown.map((dropdownItem) => (
                      <button
                        key={dropdownItem.id}
                        onClick={() => scrollToSection(dropdownItem.id)}
                        className="block w-full text-left px-6 py-2 text-sm text-neutral-medium-gray hover:text-primary-red transition-colors duration-200 vietnamese-text"
                      >
                        {dropdownItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
