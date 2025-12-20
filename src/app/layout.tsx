import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Providers from './providers';
import ConditionalLayout from '@/components/ConditionalLayout/ConditionalLayout';
import { GoogleAnalytics } from '@next/third-parties/google';

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Гранит памяти",
  description: "Изготовление и установка памятников из гранита. Каталог, цены, примеры работ. г. Гродно",
  keywords: ['памятники', 'гранит', 'Гродно', 'мемориалы', 'заказать', 'установка', 'ритуальные услуги', 'ритуальные услуги в Гродно', 'ритуальные услуги в Беларуси'],
  authors: [
    { name: 'Гранит Памяти', url: 'https://granit-memory.by' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <GoogleAnalytics gaId="G-D3JDTEHXTJ" />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'visible' }}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
