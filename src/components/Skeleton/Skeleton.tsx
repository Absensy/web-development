import React from 'react';
import { Skeleton as MuiSkeleton, Box, Stack, SxProps, Theme } from '@mui/material';

interface SkeletonProps {
    variant?: 'text' | 'rectangular' | 'circular';
    width?: number | string;
    height?: number | string;
    animation?: 'pulse' | 'wave' | false;
    sx?: SxProps<Theme>;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'rectangular',
    width,
    height,
    animation = 'wave',
    sx
}) => {
    return (
        <MuiSkeleton
            variant={variant}
            width={width}
            height={height}
            animation={animation}
            sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                borderRadius: variant === 'rectangular' ? '4px' : undefined,
                '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                },
                ...sx
            }}
        />
    );
};

// Скелетон для карточки товара
export const ProductCardSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.06)',
                height: '100%',
                minHeight: '400px',
                width: '100%',
                maxWidth: '320px',
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            {/* Изображение с возможными бейджами */}
            <Box sx={{ height: { xs: "200px", sm: "210px", md: "220px" }, position: 'relative', minHeight: "200px" }}>
                <Skeleton height="100%" />
                {/* Имитация возможного бейджа скидки (справа вверху) */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        borderRadius: '12px'
                    }}
                >
                    <Skeleton
                        width="50px"
                        height="24px"
                        sx={{ backgroundColor: 'rgba(255, 82, 82, 0.2)' }}
                    />
                </Box>
                {/* Имитация возможного бейджа "Популярное" */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        borderRadius: '12px'
                    }}
                >
                    <Skeleton
                        width="80px"
                        height="24px"
                        sx={{ backgroundColor: 'rgba(76, 175, 80, 0.2)' }}
                    />
                </Box>
            </Box>

            {/* Контент */}
            <Box sx={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* Название */}
                <Skeleton height="24px" width="80%" sx={{ marginBottom: '8px' }} />

                {/* Подтекст/описание */}
                <Skeleton height="16px" width="100%" sx={{ marginBottom: '8px' }} />
                <Skeleton height="16px" width="70%" sx={{ marginBottom: '16px' }} />

                {/* Цена с возможной старой ценой */}
                <Box sx={{ marginBottom: '16px' }}>
                    <Skeleton height="16px" width="80px" sx={{ marginBottom: '4px' }} />
                    <Skeleton height="24px" width="100px" />
                </Box>

                {/* Кнопка "Подробнее" */}
                <Skeleton height="36px" width="120px" sx={{ borderRadius: '18px' }} />
            </Box>
        </Box>
    );
};

// Скелетон для карточки категории
export const CategoryCardSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.06)',
                minHeight: { xs: '350px', sm: '400px' },
                maxHeight: { xs: '400px', sm: '450px' },
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            {/* Изображение с возможным бейджем скидки */}
            <Box sx={{ height: '250px', position: 'relative' }}>
                <Skeleton height="100%" />
                {/* Имитация возможного бейджа скидки (справа вверху как в реальном компоненте) */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        borderRadius: '5px'
                    }}
                >
                    <Skeleton
                        width="60px"
                        height="32px"
                        sx={{ backgroundColor: 'rgba(255, 82, 82, 0.2)' }}
                    />
                </Box>
            </Box>

            {/* Контент */}
            <Box sx={{ padding: { xs: '16px', md: '24px' }, display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Название категории */}
                <Skeleton height="24px" width="85%" sx={{ height: { xs: "18px", md: "24px" } }} />

                {/* Цена "от X BYN" */}
                <Box sx={{ padding: { xs: "12px 0px", md: "24px 0px" } }}>
                    <Skeleton height="30px" width="120px" sx={{ height: { xs: "24px", md: "30px" } }} />
                </Box>

                {/* Кнопка каталога */}
                <Box sx={{ marginTop: 'auto' }}>
                    <Skeleton height="36px" width="140px" sx={{ borderRadius: '18px' }} />
                </Box>
            </Box>
        </Box>
    );
};

// Скелетон для карточки примеров работ
export const ExampleWorkCardSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                justifySelf: 'center',
                width: '100%',
                minHeight: { xs: '300px', sm: '340px' },
                maxWidth: { xs: '100%', sm: '584px' },
                borderRadius: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease-in-out',
            }}
        >
            {/* Изображение */}
            <Box sx={{ height: { xs: 150, sm: 180, md: 192 }, position: 'relative' }}>
                <Skeleton height="100%" />
            </Box>

            {/* Контент */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Заголовок */}
                <Box sx={{ padding: '10px 20px', textAlign: 'center' }}>
                    <Skeleton height="24px" width="80%" sx={{ margin: '0 auto' }} />
                </Box>

                {/* Разделитель */}
                <Box sx={{ padding: '0px 20px', paddingBottom: '20px' }}>
                    <Box sx={{ height: '1px', backgroundColor: '#ccc' }} />
                </Box>

                {/* Описание */}
                <Box sx={{ flexGrow: 1, padding: '0px 20px', paddingBottom: '20px' }}>
                    <Skeleton height="16px" width="100%" sx={{ marginBottom: '8px' }} />
                    <Skeleton height="16px" width="90%" sx={{ marginBottom: '8px' }} />
                    <Skeleton height="16px" width="70%" />
                </Box>

                {/* Разделитель */}
                <Box sx={{ padding: '0px 20px', paddingBottom: '20px' }}>
                    <Box sx={{ height: '1px', backgroundColor: '#ccc' }} />
                </Box>

                {/* Информация (без материала) */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0px 20px',
                    paddingBottom: '16px'
                }}>
                    {/* Левая колонка - лейблы */}
                    <Box sx={{ color: 'text.secondary', textAlign: 'left' }}>
                        <Skeleton height="16px" width="70px" sx={{ marginBottom: '8px' }} />
                        <Skeleton height="16px" width="100px" />
                    </Box>

                    {/* Правая колонка - значения */}
                    <Box sx={{ color: 'text.primary', textAlign: 'right' }}>
                        <Skeleton height="16px" width="80px" sx={{ marginBottom: '8px' }} />
                        <Skeleton height="16px" width="70px" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

// Скелетон для контактной информации
export const ContactInfoSkeleton: React.FC = () => {
    return (
        <Stack spacing="20px">
            {/* Адрес */}
            <Stack direction="row" alignItems="center" sx={{ paddingBottom: '20px' }}>
                <Box sx={{ width: '49px', height: '49px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="circular" width="49px" height="49px" />
                </Box>
                <Box sx={{ paddingLeft: '16px' }}>
                    <Skeleton height="20px" width="60px" sx={{ marginBottom: '4px' }} />
                    <Skeleton height="16px" width="200px" />
                </Box>
            </Stack>

            {/* Телефон */}
            <Stack direction="row" alignItems="center" sx={{ paddingBottom: '20px' }}>
                <Box sx={{ width: '49px', height: '49px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="circular" width="49px" height="49px" />
                </Box>
                <Box sx={{ paddingLeft: '16px' }}>
                    <Skeleton height="20px" width="70px" sx={{ marginBottom: '4px' }} />
                    <Skeleton height="16px" width="150px" />
                </Box>
            </Stack>

            {/* Email */}
            <Stack direction="row" alignItems="center" sx={{ paddingBottom: '20px' }}>
                <Box sx={{ width: '49px', height: '49px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="circular" width="49px" height="49px" />
                </Box>
                <Box sx={{ paddingLeft: '16px' }}>
                    <Skeleton height="20px" width="50px" sx={{ marginBottom: '4px' }} />
                    <Skeleton height="16px" width="180px" />
                </Box>
            </Stack>

            {/* Режим работы */}
            <Stack direction="row" alignItems="center" sx={{ paddingBottom: '20px' }}>
                <Box sx={{ width: '49px', height: '49px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="circular" width="49px" height="49px" />
                </Box>
                <Box sx={{ paddingLeft: '16px' }}>
                    <Skeleton height="20px" width="100px" sx={{ marginBottom: '4px' }} />
                    <Skeleton height="16px" width="130px" sx={{ marginBottom: '4px' }} />
                    <Skeleton height="16px" width="140px" />
                </Box>
            </Stack>
        </Stack>
    );
};

// Скелетон для фильтров
export const FilterSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '0.5px solid #E5E7EB',
                padding: '24px',
                width: '320px',
                height: '70%',
                position: 'sticky',
                top: '20px',
                alignSelf: 'flex-start',
                maxHeight: 'calc(100vh - 80px)',
                overflowY: 'auto',
                marginLeft: '80px',
                marginBottom: '80px',
                '@media (max-width: 900px)': {
                    display: 'none',
                },
            }}
        >
            <Stack spacing="32px">
                {/* Поиск */}
                <Skeleton height="40px" width="100%" />

                {/* Сортировка */}
                <Stack spacing="16px">
                    <Skeleton height="18px" width="120px" />
                    <Skeleton height="40px" width="100%" />
                </Stack>

                {/* Категории */}
                <Stack spacing="16px">
                    <Skeleton height="18px" width="100px" />
                    <Stack spacing="8px">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} height="20px" width="80%" />
                        ))}
                    </Stack>
                </Stack>

                {/* Ценовой диапазон */}
                <Stack spacing="16px">
                    <Skeleton height="18px" width="140px" />
                    <Stack direction="row" spacing="8px">
                        <Skeleton height="40px" width="50%" />
                        <Skeleton height="40px" width="50%" />
                    </Stack>
                </Stack>

                {/* Материалы */}
                <Stack spacing="16px">
                    <Skeleton height="18px" width="80px" />
                    <Stack spacing="8px">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} height="20px" width="70%" />
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
};

// Скелетон для карточки услуги
export const ServiceCardSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: { xs: '250px', sm: '280px' },
                maxWidth: { xs: '100%', sm: '395px' },
                width: '100%',
                textAlign: 'center',
                justifyContent: 'space-around',
                transition: 'all 0.2s ease-in-out',
            }}
        >
            {/* Иконка (64x64) */}
            <Box sx={{ paddingTop: '50px' }}>
                <Skeleton variant="rectangular" width="64px" height="64px" />
            </Box>

            {/* Название с минимальной высотой и отступами */}
            <Box sx={{ paddingTop: '15px' }}>
                <Box sx={{
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '0px 18px'
                }}>
                    <Skeleton height="24px" width="80%" sx={{ height: { xs: "24px", md: "20px" } }} />
                </Box>
            </Box>

            {/* Описание */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <Box sx={{ padding: '0px 40px', paddingBottom: '30px', width: '100%' }}>
                    <Skeleton height="16px" width="100%" sx={{ marginBottom: '8px' }} />
                    <Skeleton height="16px" width="90%" sx={{ marginBottom: '8px' }} />
                    <Skeleton height="16px" width="70%" />
                </Box>
            </Box>
        </Box>
    );
};

// Скелетон для всей секции "Наши услуги"
export const GranitOurServicesSkeleton: React.FC = () => {
    return (
        <Box sx={{ padding: { xs: "40px 4%", md: "80px 5%" } }}>
            {/* Заголовок */}
            <Box sx={{ textAlign: 'center', marginBottom: { xs: '40px', md: '60px' } }}>
                <Skeleton height="36px" width="250px" sx={{ margin: '0 auto' }} />
            </Box>

            {/* Сетка карточек услуг */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)"
                    },
                    gap: { xs: "16px", sm: "20px", md: "24px" },
                    justifyContent: "center"
                }}
            >
                {[1, 2, 3].map((i) => (
                    <ServiceCardSkeleton key={i} />
                ))}
            </Box>
        </Box>
    );
};

// Скелетон для секции "О компании"
export const AboutCompanySkeleton: React.FC = () => {
    return (
        <Box sx={{ padding: { xs: '40px 4%', md: '80px 5%' } }}>
            <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Основной контейнер с адаптивной структурой */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'flex-start',
                    gap: { xs: 3, md: 6 }
                }}>
                    {/* Левая часть - контент */}
                    <Box sx={{ flex: 1, width: '100%' }}>
                        {/* Заголовок */}
                        <Skeleton height="48px" width="300px" sx={{ marginBottom: '24px' }} />

                        {/* Мобильное изображение (показывается только на мобилке) */}
                        <Box sx={{
                            display: { xs: 'block', md: 'none' },
                            width: '100%',
                            height: '250px',
                            marginBottom: '24px',
                            borderRadius: '8px'
                        }}>
                            <Skeleton height="100%" />
                        </Box>

                        {/* Основной текст */}
                        <Box sx={{ marginBottom: '32px' }}>
                            <Skeleton height="20px" width="100%" sx={{ marginBottom: '12px' }} />
                            <Skeleton height="20px" width="95%" sx={{ marginBottom: '12px' }} />
                            <Skeleton height="20px" width="85%" sx={{ marginBottom: '16px' }} />
                            <Skeleton height="20px" width="90%" sx={{ marginBottom: '12px' }} />
                            <Skeleton height="20px" width="80%" />
                        </Box>

                        {/* Статистика */}
                        <Box sx={{
                            display: 'flex',
                            gap: { xs: 2, md: 3 },
                            flexWrap: 'wrap'
                        }}>
                            {[1, 2, 3].map((i) => (
                                <Box key={i} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                                    <Skeleton height="30px" width="60px" sx={{ marginBottom: '8px' }} />
                                    <Skeleton height="16px" width="80px" />
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Правая часть - изображение (только на десктопе) */}
                    <Box sx={{
                        display: { xs: 'none', md: 'block' },
                        width: '100%',
                        maxWidth: '700px',
                        height: '400px',
                        borderRadius: '8px'
                    }}>
                        <Skeleton height="100%" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

// Скелетон для футера
export const FooterSkeleton: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'common.black',
                padding: { xs: "40px 4%", md: "40px 5%" }
            }}
        >
            <Box sx={{ maxWidth: 'false', margin: '0 auto' }}>
                {/* Основной контент */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    alignItems: { xs: "flex-start", md: "center" },
                    gap: { xs: "16px", md: "0px" }
                }}>
                    {/* Левая секция - Логотип и описание */}
                    <Box sx={{ width: { xs: "100%", md: "395px" } }}>
                        {/* Логотип и название */}
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                            <Skeleton
                                variant="rectangular"
                                width="40px"
                                height="40px"
                                sx={{ backgroundColor: 'rgba(255,255,255,0.2)', marginRight: '16px' }}
                            />
                            <Skeleton
                                height="24px"
                                width="150px"
                                sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                            />
                        </Box>
                        {/* Описание */}
                        <Skeleton
                            height="16px"
                            width="100%"
                            sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                        />
                    </Box>

                    {/* Центральная секция - Контакты */}
                    <Box sx={{ width: { xs: "100%", md: "400px" } }}>
                        <Skeleton
                            height="20px"
                            width="100px"
                            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '16px' }}
                        />
                        <Stack spacing={1}>
                            <Skeleton height="16px" width="140px" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                            <Skeleton height="16px" width="180px" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                            <Skeleton height="16px" width="200px" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                        </Stack>
                    </Box>

                    {/* Правая секция - Правовая информация */}
                    <Box sx={{ width: { xs: "100%", md: "280px" } }}>
                        <Skeleton
                            height="20px"
                            width="140px"
                            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '16px' }}
                        />
                        <Stack spacing={1}>
                            <Skeleton height="16px" width="120px" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                            <Skeleton height="16px" width="100px" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                            <Skeleton height="16px" width="160px" sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                        </Stack>
                    </Box>
                </Box>

                {/* Разделитель */}
                <Box sx={{ marginTop: 4 }}>
                    <Box sx={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
                </Box>

                {/* Нижняя часть - Copyright */}
                <Box sx={{ marginTop: '33px', textAlign: 'center' }}>
                    <Skeleton
                        height="14px"
                        width="300px"
                        sx={{ backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

// Скелетон для разделителя с иконкой
export const DividerWithIconSkeleton: React.FC = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 0px',
            position: 'relative',
            width: '100%'
        }}>
            {/* Левая линия */}
            <Box sx={{
                flex: 1,
                height: '1px',
                backgroundColor: 'rgba(0,0,0,0.1)',
                marginRight: '20px'
            }} />

            {/* Центральная иконка */}
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Skeleton
                    variant="circular"
                    width="24px"
                    height="24px"
                    sx={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
                />
            </Box>

            {/* Правая линия */}
            <Box sx={{
                flex: 1,
                height: '1px',
                backgroundColor: 'rgba(0,0,0,0.1)',
                marginLeft: '20px'
            }} />
        </Box>
    );
};

export default Skeleton;
