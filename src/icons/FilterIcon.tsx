import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const FilterIcon = ({size = 13, ...props}:CustomSVGProps) => {
     return (
         <svg
             viewBox='0 0 13 13'
             width={size}
             height={size}
             {...props}
         >
             <image
                 href="/images/FilterIcon.svg"
                 width='13'
                 height='13'
             />
         </svg>
     )
 }
export default FilterIcon;