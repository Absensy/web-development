import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const GreenCheckIcon = ({size = 19, ...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 18 18'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href="/images/greenCheck.svg"
                width='18'
                height='18'
            />            
        </svg>
    )
}

export default GreenCheckIcon;