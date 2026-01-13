import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const TelIcon = ({size = 17, ...props}:CustomSVGProps) => {
    const imagePath = "/images/tel.svg";
    return (
        <svg
            viewBox='0 0 16 16'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href={imagePath}
                xlinkHref={imagePath}
                width='16'
                height='16'
            />            
        </svg>
    )
}

export default TelIcon;