import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const MailCircleIcon = ({size = 49, ...props}:CustomSVGProps) => {
    const imagePath = "/images/MailCircleIcon.svg";
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

export default MailCircleIcon;