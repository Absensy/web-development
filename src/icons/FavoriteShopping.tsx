import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const FavoriteShoppingIcon = ({size = 25, ...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 24 22'
            width={size}
            height={size}
            {...props}
        >
            <image
                href="/images/FavoriteShopping.svg"
                width='24'
                height='21'
            />
        </svg>
    )
}

export default FavoriteShoppingIcon;
