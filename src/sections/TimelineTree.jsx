import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Extended timeline data with branches
const timelineTreeData = [
  {
    year: "1890",
    title: "Sinh ra tại Làng Sen",
    description: "19/5/1890: Nguyễn Sinh Cung chào đời tại làng Sen, xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An",
    label: "I",
    type: 'main',
    color: 'from-primary-red to-primary-dark-red'
  },
  {
    year: "1911",
    title: "Ra đi tìm đường cứu nước",
    description: "Rời Việt Nam trên tàu Amiral Latouche-Tréville với tên Văn Ba, bắt đầu hành trình tìm hiểu thế giới",
    label: "II",
    type: 'main',
    color: 'from-primary-gold to-amber-600',
    branches: [
      {
        year: "1912-1913",
        title: "Hành trình qua các châu lục",
        description: "Đi qua nhiều nước châu Á, châu Phi, châu Mỹ để tìm hiểu và học hỏi",
        side: 'left'
      },
      {
        year: "1914-1918",
        title: "Thời kỳ ở Anh và Pháp",
        description: "Làm việc và hoạt động cách mạng tại châu Âu",
        side: 'right'
      }
    ]
  },
  {
    year: "1920",
    title: "Gia nhập phong trào cộng sản",
    description: "Tham gia thành lập Đảng Cộng sản Pháp, chính thức bước vào con đường cách mạng chuyên nghiệp",
    label: "III",
    type: 'main',
    color: 'from-primary-red to-primary-dark-red',
    branches: [
      {
        year: "1921",
        title: "Thành lập Hội Liên hiệp thuộc địa",
        description: "Tổ chức các hoạt động đoàn kết các dân tộc thuộc địa",
        side: 'left'
      }
    ]
  },
  {
    year: "1930",
    title: "Thành lập Đảng Cộng sản Việt Nam",
    description: "Chủ trì Hội nghị thành lập Đảng tại Hồng Kông, thống nhất các tổ chức cộng sản trong nước",
    label: "IV",
    type: 'main',
    color: 'from-primary-gold to-amber-600',
    branches: [
      {
        year: "1929",
        title: "Hội nghị hợp nhất",
        description: "Chuẩn bị cho việc thống nhất các tổ chức cộng sản",
        side: 'left'
      },
      {
        year: "1931",
        title: "Xây dựng cương lĩnh",
        description: "Hoàn thiện cương lĩnh và chiến lược cách mạng",
        side: 'right'
      }
    ]
  },
  {
    year: "1941",
    title: "Về nước lãnh đạo cách mạng",
    description: "Trở về Việt Nam sau 30 năm ở nước ngoài, thành lập Mặt trận Việt Minh",
    label: "V",
    type: 'main',
    color: 'from-primary-red to-primary-dark-red',
    branches: [
      {
        year: "1942-1943",
        title: "Bị giam ở Trung Quốc",
        description: "Viết 'Nhật ký trong tù' gồm 133 bài thơ",
        side: 'right'
      }
    ]
  },
  {
    year: "1945",
    title: "Cách mạng Tháng Tám thành công",
    description: "2/9/1945: Đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa",
    label: "VI",
    type: 'main',
    color: 'from-primary-gold to-primary-red',
    branches: [
      {
        year: "8/1945",
        title: "Tổng khởi nghĩa",
        description: "Lãnh đạo nhân dân nổi dậy giành chính quyền",
        side: 'left'
      },
      {
        year: "9/1945",
        title: "Thành lập chính phủ",
        description: "Trở thành Chủ tịch nước đầu tiên của Việt Nam",
        side: 'right'
      }
    ]
  },
  {
    year: "1969",
    title: "Từ trần",
    description: "2/9/1969: Chủ tịch Hồ Chí Minh từ trần tại Hà Nội, để lại di sản tư tưởng vĩ đại cho dân tộc",
    label: "VII",
    type: 'main',
    color: 'from-neutral-dark-gray to-neutral-medium-gray'
  }
];

const TimelineNode = ({ item, index, isVisible }) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      {/* Main node */}
      <div className="relative z-20">
        {/* Connection line to next node */}
        {index < timelineTreeData.length - 1 && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-gold/60 to-primary-red/60"
            initial={{ height: 0 }}
            animate={isVisible ? { height: '120px' } : { height: 0 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.8, ease: "easeInOut" }}
          />
        )}
        
        {/* Node circle with Roman numeral */}
        <motion.div
          className={`relative w-16 h-16 mx-auto bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-xl border-2 border-white`}
          whileHover={{ scale: 1.15, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <span className="text-white text-xl font-serif font-bold">{item.label}</span>
          
          {/* Subtle pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Year text */}
        <motion.div 
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-primary-dark-red font-serif text-lg font-bold whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.1 }}
        >
          {item.year}
        </motion.div>
        
        {/* Main content card - elegant text style */}
        <motion.div
          className="mt-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          <h3 className="text-2xl font-serif text-center text-primary-dark-red mb-3 leading-tight">
            {item.title}
          </h3>
          <p className="text-center text-neutral-dark-gray leading-relaxed px-8">
            {item.description}
          </p>
        </motion.div>
      </div>
      
      {/* Branches */}
      {item.branches && (
        <div className="relative mt-8">
          {item.branches.map((branch, branchIndex) => (
            <motion.div
              key={branchIndex}
              className={`absolute top-0 ${
                branch.side === 'left' 
                  ? 'right-1/2 mr-32 text-right' 
                  : 'left-1/2 ml-32 text-left'
              }`}
              initial={{ opacity: 0, x: branch.side === 'left' ? 50 : -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: branch.side === 'left' ? 50 : -50 }}
              transition={{ delay: index * 0.2 + 0.5 + branchIndex * 0.1 }}
            >
              {/* Simple branch line */}
              <motion.div
                className={`absolute top-6 ${
                  branch.side === 'left' 
                    ? 'right-full mr-8 w-24' 
                    : 'left-full ml-8 w-24'
                } h-px bg-gradient-to-r from-primary-gold/40 to-primary-red/40`}
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: index * 0.15 + 0.3 + branchIndex * 0.1, duration: 0.5 }}
                style={{ transformOrigin: branch.side === 'left' ? 'right' : 'left' }}
              />
              
              {/* Branch content - minimalist text */}
              <motion.div
                className={`relative max-w-xs ${
                  branch.side === 'left' ? 'pr-4' : 'pl-4'
                }`}
                whileHover={{ x: branch.side === 'left' ? -5 : 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-primary-gold text-xs font-mono uppercase tracking-wider mb-1">
                  {branch.year}
                </div>
                <h4 className="text-primary-dark-red font-serif text-lg mb-1">
                  {branch.title}
                </h4>
                <p className="text-neutral-medium-gray text-sm leading-relaxed">
                  {branch.description}
                </p>
              </motion.div>
              
              {/* Branch dot indicator */}
              <motion.div
                className={`absolute top-6 ${
                  branch.side === 'left' ? 'right-0' : 'left-0'
                } w-2 h-2 bg-primary-gold/80 rounded-full`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const TimelineTree = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="timeline" className="py-20 bg-gradient-to-b from-white via-primary-light-gold/10 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header - Elegant typography */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-5xl font-serif text-primary-dark-red mb-4"
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={isInView ? { letterSpacing: "0.05em", opacity: 1 } : { letterSpacing: "0.5em", opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            VĂN KIỆN VÀ NGHỊ QUYẾT
          </motion.h2>
          <motion.div 
            className="w-24 h-px bg-primary-gold mx-auto mb-4"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-lg text-neutral-medium-gray max-w-2xl mx-auto font-light italic">
            "Không có gì quý hơn độc lập, tự do"
          </p>
        </motion.div>

        {/* Timeline Tree */}
        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary-red to-primary-gold"></div>
          </div>
          
          {/* Timeline nodes */}
          <div className="relative space-y-24">
            {timelineTreeData.map((item, index) => (
              <TimelineNode
                key={index}
                item={item}
                index={index}
                isVisible={isInView}
              />
            ))}
          </div>
          
          {/* End marker - Minimalist style */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: timelineTreeData.length * 0.15 }}
          >
            <div className="relative">
              <div className="w-1 h-1 bg-primary-dark-red rounded-full"></div>
              <motion.div 
                className="absolute inset-0 w-1 h-1 bg-primary-dark-red rounded-full"
                animate={{ scale: [1, 3, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle decorative lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent to-primary-gold/20"
        animate={{ 
          x: [-100, 100],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-32 h-px bg-gradient-to-l from-transparent to-primary-red/20"
        animate={{ 
          x: [100, -100],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
      />
    </section>
  );
};

export default TimelineTree;
