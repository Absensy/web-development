'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import LogoGranitPrimary2Icon from '@/icons/LogoGranitPrimary2';
import { useContactContext } from '@/contexts/ContactContext';
import { useFooterContent } from '@/hooks/useContent';
import { StackFooter } from './Footer.styles';
import { FooterSkeleton } from '../Skeleton/Skeleton';

const Footer = () => {
  const { contactInfo, loading: contactLoading } = useContactContext();
  const { data: footerData, loading: footerLoading } = useFooterContent();

  if (contactLoading || footerLoading) {
    return <FooterSkeleton />;
  }

  return (
    <Box component="footer" bgcolor="common.black" padding={{ xs: "40px 4%", md: "40px 5%" }}>
      <Container maxWidth={false} disableGutters>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" flexWrap="wrap" alignItems="flex-start" gap={{ xs: "16px", md: "0px" }}>
          <Box>
            <StackFooter width={{ xs: "100%", md: "395px" }}>
              <Stack flexDirection="row" alignItems="center" marginBottom="16px">
                <LogoGranitPrimary2Icon />
                <Typography variant="h6" fontWeight="700" fontSize="24px" color="common.white" marginLeft="16px">Гранит памяти</Typography>
              </Stack>
              <Typography variant="body2" fontWeight="400" fontSize="16px" color="common.white">
                {footerData.slogan}
              </Typography>
            </StackFooter>
          </Box>

          <Box>
            <StackFooter width={{ xs: "100%", md: "400px" }}>
              <Typography variant="subtitle2" fontWeight="600" fontSize="20px" color="common.white" marginBottom="16px">Контакты</Typography>
              <Link
                href={`tel:${contactInfo?.phone?.replace(/\s/g, '') || '+375297082111'}`}
                underline="none"
                fontWeight="400"
                fontSize="16px"
                color="common.white"
              >
                {contactInfo?.phone || '+375(29)708-21-11'}
              </Link>
              <Link
                href={`mailto:${contactInfo?.email || 'info@granite-memory.by'}`}
                underline="none"
                fontWeight="400"
                fontSize="16px"
                color="common.white"
              >
                {contactInfo?.email || 'info@granite-memory.by'}
              </Link>
              <Typography variant="body2" fontWeight="400" color="common.white">
                {contactInfo?.address || 'пр.Янки Купалы 22а, цокольный этаж'}
              </Typography>
            </StackFooter>
          </Box>

          <Box>
            <StackFooter width={{ xs: "100%", md: "280px" }}>
              <Typography variant="subtitle2" fontWeight="600" fontSize="20px" color="common.white" marginBottom="16px">Правовая информация</Typography>
              <Typography variant="body2" fontWeight="400" fontSize="16px" color="common.white">{footerData.company_full_name}</Typography>
              <Typography variant="body2" fontWeight="400" fontSize="16px" color="common.white">УНП: {footerData.unp_number}</Typography>
            </StackFooter>
          </Box>
        </Box>

        <Box marginTop={4}>
          <Divider />
        </Box>

        <Stack marginTop="33px" alignItems="center">
          <Typography variant="caption" color="common.white">{footerData.copyright_text}</Typography>
        </Stack>

      </Container>
    </Box>
  );
};

export default Footer;

