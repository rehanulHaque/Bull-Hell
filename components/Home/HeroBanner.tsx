"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HeroBanner() {
  const bannerImages = ["/banner-1.jpg", "/banner-2.jpg", "/banner-3.jpg"];

  const [[index, direction], setIndex] = useState([0, 0]);

  // Change Slide
  const paginate = (newDirection: number) => {
    setIndex(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;

      // Loop Back
      if (nextIndex < 0) nextIndex = bannerImages.length - 1;
      if (nextIndex >= bannerImages.length) nextIndex = 0;

      return [nextIndex, newDirection];
    });
  };

  // Auto Slide Interval
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Animation Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-62.5 sm:h-100 md:h-125 overflow-hidden">

      {/* Slider */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, info) => {
            if (info.offset.x > 100) paginate(-1);
            else if (info.offset.x < -100) paginate(1);
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={bannerImages[index]}
            alt="Hero Banner"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
      >
        <ArrowLeft/>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
      >
        <ArrowRight/>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {bannerImages.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition ${
              i === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
