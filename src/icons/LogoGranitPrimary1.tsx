import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const LogoGranitPrimary1Icon = ({ size = 92, ...props }: CustomSVGProps) => {
    const imagePath = "/images/LogoGranitPrimary1.svg";
    return (
        <svg
            viewBox='0 0 89 92'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href={imagePath}
                xlinkHref={imagePath}
                width='89'
                height='92'
            />
        </svg>
    )
}

export default LogoGranitPrimary1Icon;