import React from "react";

const BadgeShine = ({ children }) => {
  return (
    <span
      className="
        inline-flex
        items-center
        justify-center
        animate-background-shine
        rounded-full
        border border-gray-800
        bg-[linear-gradient(110deg,#000,40%,#ffffff,50%,#000,60%)]
        bg-[length:250%_100%]
        px-3 py-1
        text-xs
        font-medium
        text-gray-300
      "
    >
      {children}
    </span>
  );
};

export default BadgeShine;