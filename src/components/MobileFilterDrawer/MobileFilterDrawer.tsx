'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Drawer,
    IconButton,
    TextField,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    Checkbox,
    CircularProgress,
    Alert,
    Divider,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterIcon from '@/icons/FilterIcon';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import { useFilterContext } from '@/contexts/FilterContext';
import EmptyState from '../EmptyState/EmptyState';

const FilterButton = styled(Button)(({ theme }) => ({
    gap: '10px',
    fontSize: "14px",
    display: "none",
    backgroundColor: '#FFFFFF',
    color: '#0A0A0A',
    borderStyle: 'solid',
    borderRadius: '12px',
    borderWidth: '1px',
    borderColor: '#E5E7EB',
    textTransform: 'none',
    padding: '12px 20px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    fontWeight: 500,
    '&:hover': {
        backgroundColor: '#F8F9FA',
        borderColor: '#D1D5DB',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    },
    '&:active': {
        backgroundColor: '#F1F3F4',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    },
    [theme.breakpoints.down("md")]: {
        display: "flex"
    },
    [theme.breakpoints.down("sm")]: {
        display: "flex",
        gap: '8px',
        padding: '10px 16px',
    }
}));

const FilterSection = styled(Box)(() => ({
    backgroundColor: 'transparent',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
}));

const InfoBox = styled(Box)(() => ({
    backgroundColor: 'transparent',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
}));

const ActiveFiltersChip = styled(Chip)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '12px',
    height: '24px',
    '& .MuiChip-deleteIcon': {
        color: 'white',
        fontSize: '16px',
    },
}));

const MobileFilterDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { filterData, filters, loading, error, updateFilter, toggleCategory, toggleMaterial, resetFilters } = useFilterContext();

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.search) count++;
        if (filters.selectedCategories.length > 0) count++;
        if (filters.selectedMaterials.length > 0) count++;
        if (filters.priceMin || filters.priceMax) count++;
        return count;
    };

    const activeFiltersCount = getActiveFiltersCount();

    return (
        <>
            <FilterButton onClick={toggleDrawer(true)}>
                <FilterIcon />
                Фильтры
                {activeFiltersCount > 0 && (
                    <Chip
                        label={activeFiltersCount}
                        size="small"
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            fontSize: '12px',
                            height: '20px',
                            minWidth: '20px'
                        }}
                    />
                )}
            </FilterButton>

            <Drawer
                anchor="top"
                open={isOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    zIndex: 1400,
                    '& .MuiDrawer-paper': {
                        top: 0,
                        height: '100vh',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <Box sx={{ width: '100%', padding: '20px', paddingTop: '20px' }}>
                    {/* Заголовок с кнопкой закрытия */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom="24px">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <FilterIcon />
                            <Typography variant="h6" fontWeight="700" fontSize="20px" color="text.primary">
                                Фильтры
                            </Typography>
                            {activeFiltersCount > 0 && (
                                <ActiveFiltersChip
                                    label={`${activeFiltersCount} активных`}
                                    onDelete={() => resetFilters()}
                                />
                            )}
                        </Stack>
                        <IconButton onClick={toggleDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    {/* Предупреждение о автоматическом применении */}
                    <InfoBox>
                        <InfoIcon sx={{ color: 'primary.main', fontSize: '20px' }} />
                        <Typography variant="body2" color="primary.main" fontWeight="500">
                            Фильтры применяются автоматически при их выборе
                        </Typography>
                    </InfoBox>

                    {loading ? (
                        <Box display="flex" justifyContent="center" padding="40px">
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : !filterData ? (
                        <Typography>Данные не загружены</Typography>
                    ) : (
                        <Stack spacing="24px">
                            {/* Поисковая строка */}
                            <FilterSection>
                                <Typography fontWeight={600} fontSize="18px" marginBottom="16px">
                                    Поиск
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="medium"
                                    placeholder="Поиск памятников..."
                                    value={filters.search}
                                    onChange={(e) => updateFilter('search', e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FilterSection>

                            <Divider sx={{ margin: '20px 0', borderColor: '#E5E7EB' }} />

                            {/* Сортировка */}
                            <FilterSection>
                                <Typography fontWeight={600} fontSize="18px" marginBottom="16px">
                                    Сортировка
                                </Typography>
                                <FormControl fullWidth size="medium">
                                    <Select
                                        value={filters.sortBy}
                                        onChange={(e) => updateFilter('sortBy', e.target.value)}
                                        IconComponent={ArrowDropDownIcon}
                                    >
                                        {filterData.sortOptions.map((option: { value: string; label: string }) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </FilterSection>

                            <Divider sx={{ margin: '20px 0', borderColor: '#E5E7EB' }} />

                            {/* Категории */}
                            <FilterSection>
                                <Typography fontWeight={600} fontSize="18px" marginBottom="16px">
                                    Категории
                                </Typography>
                                {filterData.categories.length === 0 ? (
                                    <EmptyState
                                        message="Категории не найдены"
                                        variant="minimal"
                                        height={60}
                                    />
                                ) : (
                                    <FormGroup>
                                        {filterData.categories.map((category: { id: number; name: string }) => (
                                            <FormControlLabel
                                                key={category.id}
                                                control={
                                                    <Checkbox
                                                        checked={filters.selectedCategories.includes(category.id)}
                                                        onChange={() => toggleCategory(category.id)}
                                                    />
                                                }
                                                label={
                                                    <Typography fontSize="16px" fontWeight="400">
                                                        {category.name}
                                                    </Typography>
                                                }
                                            />
                                        ))}
                                    </FormGroup>
                                )}
                            </FilterSection>

                            <Divider sx={{ margin: '20px 0', borderColor: '#E5E7EB' }} />

                            {/* Ценовой диапазон */}
                            <FilterSection>
                                <Typography fontWeight={600} fontSize="18px" marginBottom="16px">
                                    Ценовой диапазон
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <OutlinedInput
                                        fullWidth
                                        size="medium"
                                        placeholder="От"
                                        type="number"
                                        value={filters.priceMin || ''}
                                        onChange={(e) => updateFilter('priceMin', e.target.value ? Number(e.target.value) : null)}
                                    />
                                    <OutlinedInput
                                        fullWidth
                                        size="medium"
                                        placeholder="До"
                                        type="number"
                                        value={filters.priceMax || ''}
                                        onChange={(e) => updateFilter('priceMax', e.target.value ? Number(e.target.value) : null)}
                                    />
                                </Stack>
                            </FilterSection>

                            <Divider sx={{ margin: '20px 0', borderColor: '#E5E7EB' }} />

                            {/* Материалы */}
                            <FilterSection>
                                <Typography fontWeight={600} fontSize="18px" marginBottom="16px">
                                    Материалы
                                </Typography>
                                {filterData.materials.length === 0 ? (
                                    <EmptyState
                                        message="Материалы не найдены"
                                        variant="minimal"
                                        height={60}
                                    />
                                ) : (
                                    <FormGroup>
                                        {filterData.materials.map((material: string) => (
                                            <FormControlLabel
                                                key={material}
                                                control={
                                                    <Checkbox
                                                        checked={filters.selectedMaterials.includes(material)}
                                                        onChange={() => toggleMaterial(material)}
                                                    />
                                                }
                                                label={
                                                    <Typography fontSize="16px" fontWeight="400">
                                                        {material}
                                                    </Typography>
                                                }
                                            />
                                        ))}
                                    </FormGroup>
                                )}
                            </FilterSection>

                            {/* Кнопка сброса */}
                            <Box display="flex" justifyContent="center" marginTop="20px">
                                <Button
                                    variant="outlined"
                                    onClick={resetFilters}
                                    sx={{
                                        padding: '12px 32px',
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Сбросить все фильтры
                                </Button>
                            </Box>
                        </Stack>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default MobileFilterDrawer;
