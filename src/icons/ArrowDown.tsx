import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ArrowDownIcon = ({ size = 21, ...props }: CustomSVGProps) => {
    const imagePath = "/images/arrowDown.svg";
    return (
        <svg
            viewBox='0 0 20 20'
            width={size}
            height={size}   
            {...props}
        >
            <image 
                href={imagePath}
                xlinkHref={imagePath}
                width='20'
                height='20'
            />
        </svg>
    )
}

export default ArrowDownIcon;