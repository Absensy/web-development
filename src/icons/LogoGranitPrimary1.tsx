import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const LogoGranitPrimary1Icon = ({ size = 92, ...props }: CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 89 92'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href="/images/LogoGranitPrimary1.svg"
                width='89'
                height='92'
            />
        </svg>
    )
}

export default LogoGranitPrimary1Icon;