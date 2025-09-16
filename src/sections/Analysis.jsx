import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FaClock,
  FaCrown,
  FaBalanceScale,
  FaExclamationTriangle,
  FaGlobeAmericas,
  FaRoute,
  FaLightbulb,
  FaUsersCog,
  FaFlagCheckered,
  FaGraduationCap
} from 'react-icons/fa';
import { analysisContent } from '../data/content';

const iconMap = {
  'clock': FaClock,
  'crown': FaCrown,
  'balance-scale': FaBalanceScale,
  'exclamation-triangle': FaExclamationTriangle,
  'globe-americas': FaGlobeAmericas,
  'route': FaRoute,
  'lightbulb': FaLightbulb,
  'users-cog': FaUsersCog,
  'flag-checkered': FaFlagCheckered,
  'graduation-cap': FaGraduationCap
};

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const Icon = iconMap[item.icon] || FaExclamationTriangle;

  return (
    <div
      ref={ref}
      className={`flex gap-6 p-8 bg-primary-light-gold rounded-xl shadow-sm hover:shadow-md transition-all duration-500 ${inView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        }`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Timeline Icon */}
      <div className="flex-shrink-0 w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white text-xl">
        <Icon />
      </div>

      {/* Timeline Line */}
      {/* {index < analysisContent.timesCreateHero.timeline.length - 1 && (
        <div className="absolute left-6 top-12 w-0.5 h-16 bg-primary-gold"></div>
      )} */}

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-xl font-serif font-semibold text-primary-red mb-3">
          {item.title}
        </h4>
        {item.content.startsWith("http") ? (
          <a
            href={item.content}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Tạp chí Cộng sản điện tử
          </a>
        ) : (
          <p className="text-neutral-dark-gray leading-relaxed">
            {item.content}
          </p>
        )}
      </div>
    </div>
  );
};

const AchievementItem = ({ achievement, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const Icon = iconMap[achievement.icon] || FaLightbulb;

  return (
    <div
      ref={ref}
      className={`flex gap-6 p-8 bg-primary-light-gold rounded-xl shadow-sm hover:shadow-md transition-all duration-500 ${inView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white text-xl">
        <Icon />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-xl font-serif font-semibold text-primary-dark-red mb-3">
          {achievement.title}
        </h4>
        {achievement.content.startsWith("http") ? (
          <a
            href={achievement.content}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Cổng Thông tin điện tử Chính phủ
          </a>
        ) : (
          <p className="text-neutral-dark-gray leading-relaxed">
            {achievement.content}
          </p>
        )}
      </div>
    </div>
  );
};

const Analysis = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [introRef, introInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const [conclusionRef, conclusionInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="analysis" className="py-20 bg-neutral-light-gray">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-800 ${titleInView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
            }`}
        >
          <h2 className="section-title mb-6">
            {analysisContent.title}
          </h2>
          <p className="text-xl text-neutral-medium-gray max-w-3xl mx-auto">
            {analysisContent.subtitle}
          </p>
        </div>

        {/* Introduction */}
        <div
          ref={introRef}
          className={`text-center mb-16 transition-all duration-800 ${introInView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
            }`}
        >
          <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-soft">
            <p className="text-xl font-medium text-neutral-medium-gray leading-relaxed">
              {analysisContent.intro}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Times Create Hero */}
          <div className="bg-white p-8 rounded-xl shadow-soft">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-4 mb-4">
                <FaClock className="text-3xl text-primary-gold" />
                <h3 className="text-2xl font-serif font-bold text-primary-red">
                  {analysisContent.timesCreateHero.title}
                </h3>
              </div>
              <p className="text-lg text-neutral-medium-gray">
                {analysisContent.timesCreateHero.subtitle}
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-6 bottom-16 w-0.5 bg-primary-gold/30"></div>

              {analysisContent.timesCreateHero.timeline.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Hero Creates Times */}
          <div className="bg-white p-8 rounded-xl shadow-soft">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-4 mb-4">
                <FaCrown className="text-3xl text-primary-gold" />
                <h3 className="text-2xl font-serif font-bold text-primary-red">
                  {analysisContent.heroCreatesTimes.title}
                </h3>
              </div>
              <p className="text-lg text-neutral-medium-gray">
                {analysisContent.heroCreatesTimes.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {analysisContent.heroCreatesTimes.achievements.map((achievement, index) => (
                <AchievementItem key={index} achievement={achievement} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Conclusion */}
        {/* <div 
          ref={conclusionRef}
          className={`transition-all duration-800 ${
            conclusionInView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-gradient-to-br from-primary-red to-primary-dark-red p-12 rounded-xl text-white text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <FaBalanceScale className="text-3xl text-primary-gold" />
              <h3 className="text-2xl font-serif font-bold">
                Kết Luận
              </h3>
            </div>

            <p className="text-xl font-semibold mb-8 text-primary-light-gold">
              {analysisContent.conclusion.highlight}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
              {analysisContent.conclusion.points.map((point, index) => (
                <div key={index} className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-primary-gold/10 border border-primary-gold p-8 rounded-xl">
              <blockquote className="text-lg italic text-primary-light-gold leading-relaxed">
                "{analysisContent.conclusion.metaphor}"
              </blockquote>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Analysis;
