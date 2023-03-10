import React, { useState } from "react";
import { RouterOutputs } from "../../utils/trpc";
import ClassCard from "../ClassCard";
interface props {
  elements: RouterOutputs["class"]["getFeaturedClasses"] | undefined;
}
const PERSLIDE = 4;
const ScrollingClassList = ({ elements }: props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLeftClick = () => {
    if (currentSlide === 0) {
      return;
    }
    setCurrentSlide(currentSlide - 1);
  };

  const handleRightClick = () => {
    if (!elements) {
      return;
    }
    if (currentSlide === Math.floor(elements.length / PERSLIDE)) {
      return;
    }
    setCurrentSlide(currentSlide + 1);
  };

  return (
    <div className="relative m-auto flex w-full overflow-hidden">
      <button
        onClick={handleLeftClick}
        className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-[50%] items-center justify-center rounded-full bg-gray-400 opacity-50 transition-all"
      >
        {"<"}
      </button>
      <button
        onClick={handleRightClick}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-[50%] items-center justify-center rounded-full bg-gray-400 opacity-50 transition-all "
      >
        {">"}
      </button>
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s",
          transform: `translateX(-${currentSlide * 200 * PERSLIDE}px)`,
        }}
        className="h-[260px] gap-2 pt-4 pb-4"
      >
        {elements &&
          elements.map((element, index) => (
            <div key={index} className="h-fit w-[250px]">
              <ClassCard data={element} />
            </div>
          ))}
      </div>
      <div className="absolute -bottom-4 h-6 w-full">
        <div
          className={`h-3/4 rounded-full bg-gray-400`}
          //   style={{
          //     width: `${(1000 / 1400) * 100}%`,
          //     transition: 'transform 0.5s',
          //     transform: `translateX(${currentSlide * 200 * PERSLIDE}px)`,
          //   }}
          style={{
            width: `${33}%`,
            transition: "transform 0.5s",
            transform: `translateX(${100 * currentSlide}%)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScrollingClassList;
