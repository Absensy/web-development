'use client';

import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname();
    const [isAdminPage, setIsAdminPage] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setIsAdminPage(pathname?.startsWith('/admin') || false);
    }, [pathname]);

    // Показываем только children на сервере, чтобы избежать гидратации
    if (!isClient) {
        return <>{children}</>;
    }

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <Box component="main" sx={{ minHeight: '100vh' }}>
                {children}
            </Box>
            <Footer />
        </>
    );
}
