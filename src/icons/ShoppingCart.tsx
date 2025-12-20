import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ShoppingCartIcon = ({ size = 18, ...props }: CustomSVGProps) => {
  return (
    <svg
      viewBox='0 0 18 16'
      width={size}
      height={size}
      {...props}
    >
      <image
        href="/images/shoppingCart.svg"
        width="18"
        height="16"
      />

    </svg>
  );
};

export default ShoppingCartIcon;