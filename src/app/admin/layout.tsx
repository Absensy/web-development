import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ-панель - Гранит памяти",
  description: "Панель управления сайтом",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}