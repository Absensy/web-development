"use client"
import { useState } from 'react';
import { Box, Typography, Button, IconButton, Drawer, Badge, Divider, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export function CartIcon() {
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <>
      <Badge badgeContent={getTotalItems()} color="primary">
        <IconButton 
          onClick={() => setCartOpen(true)} 
          color="inherit" 
          size="medium"
          sx={{ 
            padding: { xs: '8px', md: '12px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: { xs: '24px', md: '28px' } }} />
        </IconButton>
      </Badge>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          zIndex: 1400, // Выше header (1300)
        },
      }}
      ModalProps={{
        style: {
          zIndex: 1400,
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Корзина ({getTotalItems()})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">Корзина пуста</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
              {cartItems.map((item) => {
                const itemPrice = item.discount && item.oldPrice
                  ? item.oldPrice * (1 - item.discount / 100)
                  : item.price;

                return (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover', borderRadius: 4 }}
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {formatPrice(itemPrice)} BYN
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value) || 1;
                              updateQuantity(item.id, qty);
                            }}
                            inputProps={{
                              style: { textAlign: 'center', width: 40 },
                              min: 1,
                              type: 'number',
                            }}
                            size="small"
                          />
                          <IconButton
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                            sx={{ ml: 'auto' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                );
              })}
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Итого:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {formatPrice(getTotalPrice())} BYN
                </Typography>
              </Box>
              <Button
                variant="outlined"
                fullWidth
                onClick={clearCart}
                sx={{ mb: 1 }}
                startIcon={<DeleteIcon />}
              >
                Очистить корзину
              </Button>
              <Button variant="contained" fullWidth size="large">
                Оформить заказ
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

