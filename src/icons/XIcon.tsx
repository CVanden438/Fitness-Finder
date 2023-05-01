import React from "react";

const XIcon = ({ width = 24, height = 24, classNames }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={classNames}
    >
      <path
        fill="currentColor"
        d="m9 7l2 5l-2 5h2l1-2.5l1 2.5h2l-2-5l2-5h-2l-1 2.5L11 7H9Z"
      />
    </svg>
  );
};

export default XIcon;
