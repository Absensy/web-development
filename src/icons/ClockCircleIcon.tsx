import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ClockCircleIcon = ({size = 49, ...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 48 48'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href="/images/ClockCircleIcon.svg"
                width='48'
                height='48'
            />            
        </svg>
    )
}

export default ClockCircleIcon;