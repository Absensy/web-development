import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const MenuIcon = ({size = 39, ...props}:CustomSVGProps) => {
    const imagePath = "/images/MenuIcon.svg";
    return (
        <svg
            viewBox='0 0 40 40'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href={imagePath}
xlinkHref={imagePath}
                width='39'
                height='39'
            />            
        </svg>
    )
}

export default MenuIcon;