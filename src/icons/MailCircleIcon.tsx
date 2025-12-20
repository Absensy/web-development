import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const MailCircleIcon = ({size = 49, ...props}:CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 48 48'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href="/images/MailCircleIcon.svg"
                width='48'
                height='48'
            />            
        </svg>
    )
}

export default MailCircleIcon;