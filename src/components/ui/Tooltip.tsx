import React from "react";

interface props {
  children: React.ReactNode;
  text?: string | null;
}
const Tooltip: React.FC<props> = ({ children, text }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <span className="invisible absolute rounded-lg bg-black pl-1 pr-1 text-white group-hover:visible">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
