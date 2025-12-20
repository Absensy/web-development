import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const ClocksIcon = ({size = 16, ...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 17 17'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href="/images/clocks.svg"
                width='16'
                height='16'
            />            
        </svg>
    )
}

export default ClocksIcon;