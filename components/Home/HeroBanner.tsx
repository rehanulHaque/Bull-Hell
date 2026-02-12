"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { bannerImages } from "@/data"

export default function HeroBanner() {
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
    <div className="w-full overflow-hidden">
      <div className="max-w-full ">
        <div className="relative w-full h-96 sm:h-125 md:h-150 overflow-hidden">
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
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/30 via-transparent to-transparent"></div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/25 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/25 backdrop-blur-sm hover:bg-white/40 text-white p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowRight size={24} />
          </button>

          {/* Dot Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10">
            {bannerImages.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                className={`transition-all rounded-full ${i === index ? 'bg-white h-3 w-8 shadow-lg' : 'bg-white/50 h-2.5 w-2.5 hover:bg-white/75'}`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
