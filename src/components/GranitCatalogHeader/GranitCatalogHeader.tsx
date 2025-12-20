import { Typography } from "@mui/material";
import { HeaderBox, TypographyStyle } from "./GranitCatalogHeader.Styles";

const GranitCatalogHeader = () => {
     return (
          <HeaderBox>
               <TypographyStyle variant="h6" fontWeight="700" color="text.primary" >
                    Каталог мемориальных памятников
               </TypographyStyle>
               <Typography fontSize="16px" color="#9A9DA4" maxWidth="550px">
                    Откройте для себя нашу коллекцию почтенных и элегантных мемориальных памятников.
               </Typography>
          </HeaderBox>
     )
}
export default GranitCatalogHeader;