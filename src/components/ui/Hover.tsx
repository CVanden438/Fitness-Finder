import React from "react";

const Hover = ({ text }: { text: string }) => {
  return (
    <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black/40 text-white opacity-0 hover:opacity-100">
      {text}
    </div>
  );
};

export default Hover;
