import { useRef, useEffect, useState } from "react";
import Testimonial from "../../../../assets/testimonial.png";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    name: "Adelaide Johnson",
    role: "Customer",
    text: "Solid Spare parts delivers quality automotive parts, I have tried and tested them and have found them to be reliable, secured and most importantly deliver genuine products at the speed of light, I highly recommend them. They are the best out there.",
  },
  {
    name: "Adelaide Johnson",
    role: "Customer",
    text: "Solid Spare parts delivers quality automotive parts, I have tried and tested them and have found them to be reliable, secured and most importantly deliver genuine products at the speed of light, I highly recommend them. They are the best out there.",
  },
  {
    name: "Adelaide Johnson",
    role: "Customer",
    text: "Solid Spare parts delivers quality automotive parts, I have tried and tested them and have found them to be reliable, secured and most importantly deliver genuine products at the speed of light, I highly recommend them. They are the best out there.",
  },
  {
    name: "Adelaide Johnson",
    role: "Customer",
    text: "Solid Spare parts delivers quality automotive parts, I have tried and tested them and have found them to be reliable, secured and most importantly deliver genuine products at the speed of light, I highly recommend them. They are the best out there.",
  },
  {
    name: "Adelaide Johnson",
    role: "Customer",
    text: "Solid Spare parts delivers quality automotive parts, I have tried and tested them and have found them to be reliable, secured and most importantly deliver genuine products at the speed of light, I highly recommend them. They are the best out there.",
  },
  {
    name: "Adelaide Johnson",
    role: "Customer",
    text: "Solid Spare parts delivers quality automotive parts, I have tried and tested them and have found them to be reliable, secured and most importantly deliver genuine products at the speed of light, I highly recommend them. They are the best out there.",
  },
];

export default function TestimonialCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(370);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update card width based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      const containerWidth = carouselRef.current?.clientWidth || 0;

      // On mobile, make cards take full container width minus padding
      if (window.innerWidth < 768) {
        setCardWidth(containerWidth - 32); // 16px padding on each side
      } else {
        setCardWidth(370); // Default width for larger screens
      }
    };

    // Initial update
    updateCardWidth();

    // Update on resize
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const newSlide =
        direction === "left"
          ? Math.max(0, currentSlide - 1)
          : Math.min(testimonials.length - 1, currentSlide + 1);

      setCurrentSlide(newSlide);

      carouselRef.current.scrollTo({
        left: newSlide * (cardWidth + 24), // 24px for gap
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat py-12 text-white overflow-hidden font-roboto"
      style={{ backgroundImage: `url(${Testimonial})` }}
    >
      <SectionHeading title="What Customers are Saying" />

      <div className="relative flex items-center justify-center px-4">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 md:left-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition z-10"
          disabled={currentSlide === 0}
        >
          <img src="/white-left.png" alt="testimonial arrow left" />
        </button>
        <div
          ref={carouselRef}
          className="flex gap-6 scroll-smooth overflow-x-hidden w-full no-scrollbar snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white text-black p-[16px] rounded-lg shadow-md snap-center"
              style={{ width: `${cardWidth}px` }}
            >
              <img
                src="/apostrophe.png"
                alt="apostrophe"
                className="w-[35px] h-[30px]"
              />
              <p className="mt-4 text-[12px] md:text-[14px]">
                {testimonial.text}
              </p>
              <div className="mt-4 flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full"></div>
                <div className="ml-4">
                  <p className="font-bold text-[16px]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 md:right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition z-10"
          disabled={currentSlide === testimonials.length - 1}
        >
          <img src="/white-right.png" alt="testimonial arrow right" />
        </button>
      </div>

      {/* Optional: Add pagination indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => {
              setCurrentSlide(index);
              carouselRef.current?.scrollTo({
                left: index * (cardWidth + 24),
                behavior: "smooth",
              });
            }}
          />
        ))}
      </div>
    </section>
  );
}
