import React from "react";
import { useInView } from "react-intersection-observer";
import {
  FaFlag,
  FaUniversity,
  FaHandsHelping,
  FaBookOpen,
  FaStar,
  FaUsers,
  FaBalanceScale,
  FaHeart,
  FaGlobe,
  FaPalette,
  FaLeaf,
  FaUserGraduate,
} from "react-icons/fa";
import { thoughtContent } from "../data/content";

const iconMap = {
  flag: FaFlag,
  university: FaUniversity,
  "hands-helping": FaHandsHelping,
  "book-open": FaBookOpen,
  star: FaStar,
  users: FaUsers,
  "balance-scale": FaBalanceScale,
  heart: FaHeart,
  globe: FaGlobe,
  palette: FaPalette,
  leaf: FaLeaf,
  "user-graduate": FaUserGraduate,
  "hammer-sickle": FaUsers, // fallback for hammer-sickle
};

const ThoughtCard = ({ thought, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const MainIcon = iconMap[thought.icon] || FaFlag;

  return (
    <div
      ref={ref}
      id={thought.id}
      className={`content-card mb-12 transition-all duration-800 ${
        inView ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 300}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images Gallery */}
        <div className="flex-shrink-0 w-full lg:w-1/3">
          {/* Single Image (backward compatibility) */}
          {thought.image && !thought.images && (
            <div className="flex-shrink-0 w-full">
              <div className="relative rounded-xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-500 group">
                <img
                  src={thought.image}
                  alt={thought.title}
                  className="thoughts-image object-contain object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-medium text-sm text-center">
                    {thought.title}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          )}

          {/* Multiple Images */}
          {thought.images && thought.images.length > 0 && (
            <div className="space-y-4">
              {thought.images.map((imageData, imageIndex) => (
                <div
                  key={imageIndex}
                  className="relative rounded-xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-500 group"
                >
                  <img
                    src={imageData.src}
                    alt={imageData.alt}
                    className="thoughts-image object-contain object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white font-medium text-xs text-center">
                      {imageData.title}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 self-start lg:self-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-red to-primary-dark-red rounded-full flex items-center justify-center text-white text-3xl shadow-soft">
            <MainIcon />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-red mb-8">
            {thought.title}
          </h3>

          {/* Sections */}
          <div className="space-y-8">
            {thought.sections.map((section, sectionIndex) => {
              const SectionIcon = iconMap[section.icon] || FaStar;

              return (
                <div key={sectionIndex} className="bg-white/80 p-6 rounded-xl">
                  <h4 className="flex items-center gap-3 text-xl font-serif font-semibold text-primary-dark-red mb-4">
                    <SectionIcon className="text-primary-gold" />
                    {section.title}
                  </h4>

                  {/* Quote */}
                  {section.quote && (
                    <blockquote className="bg-primary-light-gold border-l-4 border-primary-gold p-4 mb-4 rounded-r-lg italic text-primary-dark-red">
                      "{section.quote}"
                    </blockquote>
                  )}

                  {/* Content */}
                  {section.content && (
                    <p className="text-neutral-dark-gray leading-relaxed mb-4">
                      {section.highlights ? (
                        <>
                          {section.content.split(section.highlights[0])[0]}
                          {section.highlights.map((highlight, i) => (
                            <span key={i}>
                              <strong className="text-primary-red font-semibold">
                                {highlight}
                              </strong>
                              {section.content
                                .split(highlight)[1]
                                ?.split(section.highlights[i + 1])?.[0] || ""}
                            </span>
                          ))}
                        </>
                      ) : (
                        section.content
                      )}
                    </p>
                  )}

                  {/* Principles (for party-state section) */}
                  {section.principles && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      {section.principles.map((principle, pIndex) => (
                        <div
                          key={pIndex}
                          className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <h5 className="text-lg font-semibold text-primary-red mb-2">
                            {principle.title}
                          </h5>
                          <p className="text-sm text-neutral-medium-gray">
                            {principle.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Thoughts = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="thoughts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-800 ${
            titleInView ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="section-title">
            Sứ Mệnh Lịch Sử Và Phương Hướng Xây Dựng Giai Cấp Công Nhân Việt Nam
          </h2>
          <p className="text-xl text-neutral-medium-gray max-w-2xl mx-auto">
            Thể hiện vai trò tiên phong trên các lĩnh vực kinh tế, chính trị –
            xã hội, văn hóa – tư tưởng và định hướng phát triển trong thời kỳ
            mới
          </p>
        </div>

        {/* Thought Cards */}
        <div className="max-w-6xl mx-auto">
          {thoughtContent.mainThoughts.map((thought, index) => (
            <ThoughtCard key={thought.id} thought={thought} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thoughts;
