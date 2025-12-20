import React from "react";
import CustomSVGProps from "@/types/CustomSVGProps";

const FavoriteCardIcon = ({size = 21, ...props}:CustomSVGProps) => {
     return (
         <svg
             viewBox='0 0 16 21'
             width={size}
             height={size}
             {...props}
         >
             <image
                 href="/images/i.svg"
                 width='16'
                 height='21'
             />
         </svg>
     )
 }
export default FavoriteCardIcon;