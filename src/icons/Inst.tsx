import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const InstIcon = ({size = 17, ...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 16 16'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href="/images/inst.svg"
                width='16'
                height='16'
            />            
        </svg>
    )
}

export default InstIcon;