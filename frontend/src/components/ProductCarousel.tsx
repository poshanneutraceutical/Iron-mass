import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

export default function ProductCarousel({
  images,
  productName,
}: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prev = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrent((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      next();
    }, 3500);

    return () => clearInterval(interval);
  }, [current, isHovered, images.length]);

  return (
    <div
      className="relative w-full aspect-square overflow-hidden bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${productName} ${current + 1}`}
          draggable={false}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) next();
            else if (info.offset.x > 80) prev();
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.98 }}
          className="
            w-full
            h-full
            object-contain
            p-6
            cursor-grab
            active:cursor-grabbing
            select-none
          "
        />
      </AnimatePresence>

      {/* Premium Gold Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(212,175,55,0.12)] pointer-events-none" />

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-8 h-2 bg-[#d4af37]"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-[#d4af37]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}