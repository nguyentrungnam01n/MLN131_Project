import React from "react";
import { useInView } from "react-intersection-observer";
import { thoughtContent } from "../data/content";

const StatItem = ({ stat, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`text-center p-8 bg-white rounded-xl shadow-soft hover:shadow-soft-hover transition-all duration-500 ${inView ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <h4 className="text-5xl font-serif font-bold text-primary-red mb-2">
        {stat.number}
      </h4>
      <p className="text-neutral-medium-gray font-medium">{stat.label}</p>
    </div>
  );
};

const Overview = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [contentRef, contentInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [imageRef, imageInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="overview" className="py-20 bg-neutral-light-gray">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-800 ${titleInView ? "animate-fade-in-up opacity-100" : "opacity-0"
            }`}
        >
          <h2 className="section-title">Tổng Quan</h2>
          <p className="text-xl text-neutral-medium-gray max-w-2xl mx-auto">
            Hệ thống nhận thức toàn diện và sâu sắc về giai cấp công nhân Việt Nam
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-16">
          {/* Text Content */}
          <div
            ref={contentRef}
            className={`mb-12 transition-all duration-800 ${contentInView ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
          >
            <h3 className="text-3xl font-serif font-bold text-primary-red mb-6 text-center">
              {thoughtContent.overview.title}
            </h3>

            <p className="text-lg leading-relaxed text-neutral-dark-gray mb-8 text-justify max-w-4xl mx-auto">
              {thoughtContent.overview.description}
            </p>
          </div>

          {/* YouTube Video iframe */}
          <div className="mb-16 text-center relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/-hr-F2GxvLs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl center"
            ></iframe>
          </div>


          {/* Image - Full Width */}
          <div
            ref={imageRef}
            className={`transition-all duration-800 overview-image-container ${imageInView ? "animate-fade-in-up opacity-100" : "opacity-0"
              }`}
          >
            <div className="relative rounded-xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all duration-500 group w-full max-w-6xl mx-auto">
              <div className="overview-image relative w-full">
                <img
                  src="/33.jpg"
                  alt="Chủ tịch Hồ Chí Minh"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-medium text-lg text-center">
                    Chủ tịch Hồ Chí Minh
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
