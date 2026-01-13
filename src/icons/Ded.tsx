import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const DedIcon= ({...props}:CustomSVGProps) => {
    const imagePath = "/images/ded.png";
    return (
        <svg
            viewBox='0 0 400 384'
            width={400}
            height={384}
            {...props}
        >
            <image 
                href={imagePath}
                xlinkHref={imagePath}
                width='600'
                height='384'
            />            
        </svg>
    )
}

export default DedIcon;