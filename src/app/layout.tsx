import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import ProvidersLayout from './(providers)/layout';
import Header from './(providers)/(root)/_components/Header';
import MainWrapper from './(providers)/(root)/_components/MainWrapper';
import Footer from './(providers)/(root)/_components/Footer';
import MenuBar from './(providers)/(root)/_components/MenuBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KoPro',
  description: ''
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersLayout>
          <Header />
          <MenuBar />
          <MainWrapper>{children}</MainWrapper>
          <Footer />
        </ProvidersLayout>
      </body>
    </html>
  );
}
