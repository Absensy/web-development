import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const GpsIcon = ({size = 17, ...props}:CustomSVGProps) => {
    const imagePath = "/images/gps.svg";
    return (
        <svg
            viewBox='0 0 12 16'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href={imagePath}
                xlinkHref={imagePath}
                width='12'
                height='16'
            />            
        </svg>
    )
}

export default GpsIcon;