import { Box } from '@mui/material';
import GranitAboutCompany from '@/components/GranitAboutCompany/GranitAboutCompany';
import GranitCategoriesCard from '@/components/GranitOurCatagol/GranitOurCatagol';
import GranitOurServices from '@/components/GranitOurServices/GranitOurServices';
import GranitExamplesOurWork from '@/components/GranitExamplesOurWork/GrintExamplesOurWork';
import GranitContacts from '@/components/GranitContacts/GranitContacts';

export default function Home() {
  return (
    <Box>
      
      <Box id="catalog">
        <GranitCategoriesCard />
      </Box>
      <Box id="about">
        <GranitAboutCompany />
      </Box>
      <Box id="services">
        <GranitOurServices />
      </Box>
      <Box id="examples">
        <GranitExamplesOurWork />
      </Box>
      <Box id="contacts">
        <GranitContacts />
      </Box>
    </Box>
  );
}

