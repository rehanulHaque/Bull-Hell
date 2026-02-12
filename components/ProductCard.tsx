"use client";

import { ProductTypes } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Star } from "lucide-react";

type Props = ProductTypes & {
  variant?: "grid" | "slider";
};

export default function ProductCard({
  title,
  image,
  price,
  link,
  variant,
}: Props) {
  const rating = 4.5;
  const reviews = 128;

  return (
    <div
      className={`group relative bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300
      ${variant === "grid" ? "rounded-lg" : ""}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-gray-100
        ${variant === "grid" ? "h-60" : "h-60 sm:h-64"}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </span>
        </div>
      </div>

      {/* Info */}
      <div className={`${variant === "grid" ? "p-4 pt-2" : "p-3 sm:p-4 sm:pt-2"}`}>
        {/* Title */}
        <h3
          className={`font-semibold line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors
          ${variant === "grid" ? "text-base" : "text-sm sm:text-base"}`}
        >
          {title.slice(0, 15) + "..."}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <p
              className={`font-bold text-gray-900
              ${variant === "grid" ? "text-2xl" : "text-lg sm:text-xl"}`}
            >
              ₹{price}
            </p>
            <p className="text-sm text-gray-500 line-through">
              ₹{Math.round(price * 1.2)}
            </p>
          </div>
          <p className="text-xs text-green-600 font-semibold">
            Save ₹{Math.round(price * 0.2)}
          </p>
        </div>

        {/* Button */}
        <Link href={link} target="_blank" className="block">
          <Button
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all
            ${variant === "grid" ? "py-2" : "py-1.5 text-sm"}`}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
