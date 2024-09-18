import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { APP_URL } from '@/common/config';
import { SITE_DESCRIPTION, SITE_NAME } from '@/common/constants';
import type { Metadata } from 'next';

import { Providers } from './providers';
import '@/common/styles/globals.scss';

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    emails: ['info@cinemahub.com'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>{children}</Providers>
        <div id="modal"></div>
      </body>
    </html>
  );
}
