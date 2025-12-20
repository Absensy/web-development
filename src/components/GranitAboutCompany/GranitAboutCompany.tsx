'use client'

import * as React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { BoxAboutCompany, TitleAboutCompany, LeftContent, RightContent, StackStats, BoxImage, ContentWrapper } from './GranitAboutCompany.styles';
import { useAboutCompanyContent } from '@/hooks/useContent';
import { AboutCompanySkeleton } from '../Skeleton/Skeleton';


const GranitAboutCompany = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data, loading } = useAboutCompanyContent();

  if (loading) {
    return <AboutCompanySkeleton />;
  }

  return (
    <BoxAboutCompany>
      <ContentWrapper>
        <LeftContent>
          {/* Название блока */}
          <Box>
            <TitleAboutCompany>
              {data.title}
            </TitleAboutCompany>
          </Box>
          {/* Фотография на мобилке */}
          {isMobile && (
            <Box width="100%" display="flex" justifyContent="center" marginBottom="20px">
              <BoxImage sx={{ width: '100%', maxWidth: "100%", height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  src={data.image}
                  alt="Мастер за работой по камню"
                  width={700}
                  height={484}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </BoxImage>
            </Box>
          )}
          {/* Информация */}
          <Box>
            <Typography variant="body1" fontSize={{ xs: "14px", md: "16px" }} paddingBottom="10px">
              {data.description}
            </Typography>
          </Box>
          {/* Статистика */}
          {data.statistics && data.statistics.length > 0 && (
            <Box>
              <StackStats direction="row" spacing={{ xs: 2, md: 3 }}>
                {data.statistics.map((stat) => (
                  <Box key={stat.value}>
                    <Typography variant="h5" component="p" fontWeight="700" fontSize={{ xs: "24px", md: "30px" }} color="primary.main" textAlign={{ xs: "center", md: "left" }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" fontSize={{ xs: "14px", md: "16px" }} color="secondary" textAlign={{ xs: "center", md: "left" }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </StackStats>
            </Box>
          )}
        </LeftContent>
        {/* Фотография на декстопе */}
        {!isMobile && (
          <RightContent>
            <BoxImage sx={{ width: '100%', maxWidth: '700px' }}>
              <Image
                src={data.image}
                alt="Картинка секции услуг"
                width={700}
                height={384}
                style={{ width: '100%', objectFit: 'contain' }}
              />
            </BoxImage>
          </RightContent>
        )}
      </ContentWrapper>
    </BoxAboutCompany>
  );
};

export default GranitAboutCompany; 