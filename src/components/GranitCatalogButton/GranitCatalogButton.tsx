import * as React from 'react';
import { CatalogButtonStyles } from './GranitCatalogButton.styles';
import ShoppingCartIcon from '@/icons/ShoppingCart';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface CatalogButtonProps {
  categoryId?: number;
}

const CatalogButton: React.FC<CatalogButtonProps> = ({ categoryId }) => {
  const href = categoryId ? `/catalog?categories=${categoryId}` : '/catalog';

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <CatalogButtonStyles variant="contained">
        <Typography variant="body2" fontSize='16px' fontWeight='400' paddingRight='10px '>Открыть каталог</Typography>
        <ShoppingCartIcon />
      </CatalogButtonStyles>
    </Link>
  );
};

export default CatalogButton;