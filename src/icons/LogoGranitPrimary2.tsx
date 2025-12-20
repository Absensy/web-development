import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const LogoGranitPrimary2Icon = ({ size = 32, ...props }: CustomSVGProps) => {
    return (
        <svg
            viewBox='0 0 31 32'
            width={size}
            height={size}
            {...props}
        >
            <image 
                href="/images/LogoGranitPrimary2.svg"
                width='31'
                height='32'
            />
        </svg>
    )
}

export default LogoGranitPrimary2Icon;