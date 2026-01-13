import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ClocksIcon = ({size = 16, ...props}:CustomSVGProps) => {
    const imagePath = "/images/clocks.svg";
    return (
        <svg
            viewBox='0 0 17 17'
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

export default ClocksIcon;