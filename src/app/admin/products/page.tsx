'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Alert,
  Avatar,
  Switch,
  FormControlLabel,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
} from '@mui/icons-material';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import ImageUpload from '@/components/ImageUpload/ImageUpload';
import { useAdminProducts } from '@/hooks/useAdminProducts';
import { useAdminCategories } from '@/hooks/useAdminCategories';
import { AdminProductsTableSkeleton } from '@/components/AdminSkeleton/AdminSkeleton';
import { AdminOperationOverlay } from '@/components/AdminOperationOverlay/AdminOperationOverlay';
import EmptyState from '@/components/EmptyState/EmptyState';

interface ProductFormData {
  name: string;
  short_description: string;
  full_description: string;
  materials: string;
  production_time: string;
  price: string;
  discount: string;
  discounted_price: string;
  image: string;
  category_id: string;
  is_new: boolean;
  is_popular: boolean;
  is_active: boolean;
}

export default function AdminProducts() {
  const { products, loading, saving, deleting, error, createProduct, updateProduct, deleteProduct } = useAdminProducts();
  const { categories } = useAdminCategories();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductCardData | null>(null);
  const [deleteAlert] = useState(false);
  const [isEditingDiscountedPrice, setIsEditingDiscountedPrice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    short_description: '',
    full_description: '',
    materials: '',
    production_time: '',
    price: '',
    discount: '',
    discounted_price: '',
    image: '',
    category_id: '',
    is_new: false,
    is_popular: false,
    is_active: true,
  });


  const handleEditProduct = (product: ProductCardData) => {
    setEditingProduct(product);
    setIsEditingDiscountedPrice(false);
    setFormData({
      name: product.name,
      short_description: product.short_description,
      full_description: product.full_description,
      materials: product.materials,
      production_time: product.production_time,
      price: product.price.toString(),
      discount: product.discount?.toString() || '',
      discounted_price: product.discounted_price?.toString() || '',
      image: product.image,
      category_id: product.category_id?.toString() || '',
      is_new: Boolean(product.is_new),
      is_popular: Boolean(product.is_popular),
      is_active: Boolean(product.is_active),
    });
    setOpenDialog(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsEditingDiscountedPrice(false);
    setFormData({
      name: '',
      short_description: '',
      full_description: '',
      materials: '',
      production_time: '',
      price: '',
      discount: '',
      discounted_price: '',
      image: '',
      category_id: '',
      is_new: false,
      is_popular: false,
      is_active: true,
    });
    setOpenDialog(true);
  };

  const handleSaveProduct = async () => {
    try {
      const productData = {
        name: formData.name,
        short_description: formData.short_description,
        full_description: formData.full_description,
        materials: formData.materials,
        production_time: formData.production_time,
        price: parseFloat(formData.price),
        ...(formData.discount && { discount: parseInt(formData.discount) }),
        ...(formData.discounted_price && { discounted_price: parseFloat(formData.discounted_price) }),
        image: formData.image,
        ...(formData.category_id && { category_id: parseInt(formData.category_id) }),
        is_new: formData.is_new,
        is_popular: formData.is_popular,
        is_active: formData.is_active,
      };

      if (editingProduct) {
        // Для редактирования нужно получить полный объект Product из products
        const fullProduct = products.find(p => p.id === editingProduct.id);
        if (fullProduct) {
          await updateProduct(editingProduct.id, productData);
        }
      } else {
        await createProduct(productData);
      }

      setOpenDialog(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: string | boolean) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };

      // Автоматический расчет цены со скидкой (только если пользователь не редактирует её вручную)
      if ((field === 'price' || field === 'discount') && !isEditingDiscountedPrice) {
        const price = field === 'price' ? parseFloat(value as string) : parseFloat(prev.price);
        const discount = field === 'discount' ? parseFloat(value as string) : parseFloat(prev.discount);

        if (price && discount && discount > 0) {
          const discountedPrice = price * (1 - discount / 100);
          newData.discounted_price = Math.round(discountedPrice).toString();
        } else if (field === 'discount' && (!discount || discount <= 0)) {
          // Если скидка убрана или равна 0, очищаем цену со скидкой
          newData.discounted_price = '';
        }
      }

      return newData;
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.short_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  interface ProductCardData {
    id: number;
    name: string;
    short_description: string;
    full_description: string;
    materials: string;
    production_time: string;
    price: number;
    discount?: number;
    discounted_price?: number;
    image: string;
    category_id?: number;
    category?: {
      id: number;
      name: string;
    };
    is_new: boolean;
    is_popular: boolean;
    is_active: boolean;
    created_at: string;
  }

  const ProductCard = ({ product }: { product: ProductCardData }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={product.image}
          alt={product.name}
          variant="rounded"
          sx={{ width: '100%', height: { xs: 160, sm: 180, md: 200 } }}
        />
        <Chip
          label={product.is_active ? "Активен" : "Неактивен"}
          color={product.is_active ? "success" : "error"}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: { xs: '0.75rem', md: '0.75rem' }
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, md: 2 }, pb: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            mb: 1.5,
            fontSize: { xs: '0.875rem', md: '0.875rem' },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.short_description}
        </Typography>

        <Typography
          variant="h6"
          fontWeight="bold"
          color="primary"
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            mb: 0.5
          }}
        >
          {product.discounted_price || product.price} BYN
          {product.discounted_price && (
            <span style={{
              textDecoration: 'line-through',
              marginLeft: 8,
              color: 'gray',
              fontSize: '0.875rem',
              fontWeight: 'normal'
            }}>
              {product.price} BYN
            </span>
          )}
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: { xs: '0.875rem', md: '0.875rem' },
            mb: 1
          }}
        >
          {product.category?.name || 'Без категории'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
          {product.is_new && <Chip label="Новинка" color="primary" size="small" sx={{ fontSize: '0.75rem' }} />}
          {product.is_popular && <Chip label="Популярный" color="success" size="small" sx={{ fontSize: '0.75rem' }} />}
        </Box>

        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, mt: 'auto' }}
        >
          Создан: {new Date(product.created_at).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: { xs: 1, md: 1.5 }, pt: 0 }}>
        <IconButton
          size="small"
          color="primary"
          onClick={() => handleEditProduct(product)}
        >
          <Edit />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => deleteProduct(product.id)}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box mb={{ xs: 3, md: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' } }}
          >
            Управление товарами
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Добавление, редактирование и удаление товаров в каталоге
          </Typography>
        </Box>

        {deleteAlert && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Выбранные товары успешно удалены!
          </Alert>
        )}

        {/* Controls */}
        <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, md: 3 } }}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', sm: 'center' }}
            gap={2}
          >
            <Box
              display="flex"
              gap={2}
              alignItems="center"
              flexDirection={{ xs: 'column', sm: 'row' }}
              width={{ xs: '100%', sm: 'auto' }}
            >
              <TextField
                size="small"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
                }}
                sx={{
                  minWidth: { xs: '100%', sm: 300 },
                  width: { xs: '100%', sm: 'auto' }
                }}
              />
            </Box>
            <Box
              display="flex"
              gap={2}
              flexDirection={{ xs: 'column', sm: 'row' }}
              width={{ xs: '100%', sm: 'auto' }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddProduct}
                sx={{
                  backgroundColor: '#333',
                  '&:hover': { backgroundColor: '#555' },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Добавить товар
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Loading State */}
        {loading && <AdminProductsTableSkeleton />}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Products Display */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <EmptyState
                message="Товары не найдены"
                variant="card"
                height={300}
              />
            ) : (
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: { xs: 2, md: 3 }
              }}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Box>
            )}
          </>
        )}

        {/* Add/Edit Product Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="lg"
          fullWidth
          fullScreen
        >
          <DialogTitle>
            {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={3} pt={1}>
              <TextField
                fullWidth
                label="Название товара"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Краткое описание"
                value={formData.short_description}
                onChange={(e) => handleInputChange('short_description', e.target.value)}
                variant="outlined"
                multiline
                rows={2}
              />
              <TextField
                fullWidth
                label="Полное описание"
                value={formData.full_description}
                onChange={(e) => handleInputChange('full_description', e.target.value)}
                variant="outlined"
                multiline
                rows={3}
              />
              <FormControl fullWidth>
                <InputLabel>Категория</InputLabel>
                <Select
                  value={formData.category_id}
                  onChange={(e) => handleInputChange('category_id', e.target.value)}
                  label="Категория"
                >
                  <MenuItem value="">Без категории</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                display="flex"
                gap={2}
                flexDirection={{ xs: 'column', sm: 'row' }}
              >
                <TextField
                  fullWidth
                  label="Цена (BYN)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Скидка (%)"
                  type="number"
                  value={formData.discount}
                  onChange={(e) => handleInputChange('discount', e.target.value)}
                  variant="outlined"
                />
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Цена со скидкой (BYN)"
                    type="number"
                    value={formData.discounted_price}
                    onChange={(e) => handleInputChange('discounted_price', e.target.value)}
                    variant="outlined"
                    InputProps={{
                      readOnly: !isEditingDiscountedPrice,
                    }}
                    helperText={isEditingDiscountedPrice ? "Редактирование вручную" : "Рассчитывается автоматически"}
                  />
                  <Button
                    variant={isEditingDiscountedPrice ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setIsEditingDiscountedPrice(!isEditingDiscountedPrice)}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    {isEditingDiscountedPrice ? "Авто" : "Изменить"}
                  </Button>
                </Box>
              </Box>
              <Box
                display="flex"
                gap={2}
                flexDirection={{ xs: 'column', sm: 'row' }}
              >
                <TextField
                  fullWidth
                  label="Материалы"
                  value={formData.materials}
                  onChange={(e) => handleInputChange('materials', e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Время производства"
                  value={formData.production_time}
                  onChange={(e) => handleInputChange('production_time', e.target.value)}
                  variant="outlined"
                />
              </Box>
              <ImageUpload
                value={formData.image}
                onChange={(imageUrl) => handleInputChange('image', imageUrl)}
                label="Изображение товара"
                helperText="Загрузите изображение товара (JPEG, PNG, WebP до 5MB)"
                previewSize={{ width: 180, height: 120 }}
                uploadType="product"
              />
              <Box display="flex" gap={2} flexDirection="column">
                <Typography variant="subtitle2" gutterBottom>
                  Статусы товара
                </Typography>
                <Box display="flex" gap={2}>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={Boolean(formData.is_new)}
                      onChange={(e) => handleInputChange('is_new', e.target.checked)}
                      color="primary"
                    />
                    <Typography variant="body2">Новинка</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Checkbox
                      checked={Boolean(formData.is_popular)}
                      onChange={(e) => handleInputChange('is_popular', e.target.checked)}
                      color="primary"
                    />
                    <Typography variant="body2">Популярный</Typography>
                  </Box>
                </Box>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(formData.is_active)}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    color="primary"
                  />
                }
                label="Товар активен (отображается на сайте)"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveProduct}
              sx={{
                backgroundColor: '#333',
                '&:hover': { backgroundColor: '#555' },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              {editingProduct ? 'Сохранить' : 'Добавить'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Operation Overlays */}
        <AdminOperationOverlay
          open={saving}
          message={editingProduct ? "Сохранение изменений..." : "Создание товара..."}
        />
        <AdminOperationOverlay
          open={deleting}
          message="Удаление товаров..."
        />
      </Container>
    </AdminLayout>
  );
}