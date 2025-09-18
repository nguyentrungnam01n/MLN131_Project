import React from 'react';
import { useInView } from 'react-intersection-observer';
import { documentData } from '../data/content';

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative mb-16 w-full transition-all duration-800 ${
        isEven ? 'md:mr-auto' : 'md:ml-auto'
      } ${inView ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Connection Line and Node for Desktop */}
      <div className="hidden md:block">
        {/* Connection Line */}
        <div className={`absolute top-8 ${isEven ? '-right-14' : '-left-14'} w-14 h-0.5 bg-primary-red`}></div>
        
        {/* Node Circle */}
        <div className={`absolute top-7 ${isEven ? '-right-16' : '-left-16'} w-3 h-3 bg-primary-red rounded-full border-2 border-white shadow-lg`}></div>
        
        {/* Year Badge */}
        <div className={`absolute top-0 ${isEven ? '-right-24' : '-left-24'} bg-primary-red text-white px-2 py-1 rounded text-xs font-bold`}>
          {item.source}
        </div>
      </div>

      {/* Content Card */}
      <div className={`content-card hover:scale-105 transition-all duration-500 ${
        isEven ? 'md:pr-8' : 'md:pl-8'
      }`}>
        <h4 className="text-xl font-serif font-bold text-primary-red mb-4">
          {item.title}
        </h4>
        <p className="text-neutral-dark-gray leading-relaxed">
          {item.description}
        </p>
      </div>
      
      {/* Mobile Year Badge */}
      <div className="md:hidden absolute -left-4 top-0 bg-primary-red text-white px-2 py-1 rounded text-xs font-bold">
        {item.year}
      </div>
    </div>
  );
};

const Timeline = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="timeline" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-800 ${
            titleInView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="section-title">
            Văn kiện và Nghị quyết tiêu biểu của Đảng
          </h2>
          <p className="text-xl text-neutral-medium-gray max-w-2xl mx-auto">
             Thể hiện rõ nét và nhất quán qua các kỳ Đại hội và các Nghị quyết chuyên đề của Ban Chấp hành Trung ương
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-primary-red"></div>
          
          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-primary-red"></div>

          {/* Timeline Items */}
          <div className="relative">
            {documentData.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* Timeline End Marker */}
          <div className="flex justify-center mt-12">
            <div className="w-4 h-4 bg-primary-red rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
