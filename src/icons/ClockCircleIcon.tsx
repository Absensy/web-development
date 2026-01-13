import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ClockCircleIcon = ({size = 49, ...props}:CustomSVGProps) => {
    const imagePath = "/images/ClockCircleIcon.svg";
    return (
        <svg
            viewBox='0 0 48 48'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href={imagePath}
                xlinkHref={imagePath}
                width='48'
                height='48'
            />            
        </svg>
    )
}

export default ClockCircleIcon;