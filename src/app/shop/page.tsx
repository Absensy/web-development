"use client"
import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { CategoryCard, DiscountBadge, PriceContainer, OldPrice, CardActions } from '@/components/GranitCatalogCard/GranitCatalogCard.Styles';

interface Product {
  id: number;
  name: string;
  subtext: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: string;
  description: string;
  materials: string;
  productionTime: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => {
        // Поддержка разных форматов: массив или объект с полем products
        const rawProducts = Array.isArray(data) ? data : (data.products || []);
        
        // Преобразуем данные из JSON в формат компонента
        const productsData: Product[] = rawProducts.map((item: any) => ({
          id: item.id,
          name: item.name,
          subtext: item.short_description || item.subtext || '',
          price: item.discounted_price || item.price,
          oldPrice: item.discount ? item.price : undefined,
          discount: item.discount,
          image: item.image || '/images/default.jpg',
          category: item.category?.name || item.category || '',
          description: item.full_description || item.description || '',
          materials: item.materials || '',
          productionTime: item.production_time || item.productionTime || '',
        }));
        
        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      image: product.image,
      subtext: product.subtext,
    });
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (loading) {
    return (
      <Box p={4}>
        <Typography>Загрузка товаров...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Заголовок страницы */}
      <Box p={4} pb={2}>
        <Typography variant="h4" fontWeight="bold">
          Каталог товаров
        </Typography>
      </Box>

      {/* Сетка товаров */}
      <Box p={4} pt={2}>
        {products.length === 0 ? (
          <Typography>Товары не найдены</Typography>
        ) : (
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="20px" justifyContent="center">
            {products.map((product) => {
            const finalPrice = product.discount && product.oldPrice
              ? product.oldPrice * (1 - product.discount / 100)
              : product.price;

            return (
              <Box key={product.id} display="flex" justifyContent="center">
                <CategoryCard>
                  <Box
                    height="200px"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                    {product.discount && (
                      <DiscountBadge>-{product.discount}%</DiscountBadge>
                    )}
                  </Box>
                  <Box padding="20px" display="flex" flexDirection="column" flex={1} justifyContent="space-between">
                    <Typography variant="h3" fontSize="20px" fontWeight="700" color="text.primary" marginBottom="8px">
                      {product.name}
                    </Typography>
                    <Typography fontSize="14px" color="text.secondary" lineHeight="1.4" sx={{ mb: 2, flexGrow: 1 }}>
                      {product.subtext}
                    </Typography>
                    <PriceContainer>
                      {product.oldPrice && <OldPrice>{formatPrice(product.oldPrice)} BYN</OldPrice>}
                      <Typography fontSize="20px" fontWeight="700" color={product.oldPrice ? "#ff5252" : "text.primary"}>
                        {formatPrice(finalPrice)} BYN
                      </Typography>
                    </PriceContainer>
                    <CardActions>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleAddToCart(product)}
                        startIcon={<AddIcon />}
                      >
                        В корзину
                      </Button>
                    </CardActions>
                  </Box>
                </CategoryCard>
              </Box>
            );
          })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

