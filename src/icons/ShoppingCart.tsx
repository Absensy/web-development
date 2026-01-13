import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ShoppingCartIcon = ({ size = 18, ...props }: CustomSVGProps) => {
    const imagePath = "/images/shoppingCart.svg";
  return (
    <svg
      viewBox='0 0 18 16'
      width={size}
      height={size}
      {...props}
    >
      <image
        href={imagePath}
        xlinkHref={imagePath}
        width="18"
        height="16"
      />

    </svg>
  );
};

export default ShoppingCartIcon;