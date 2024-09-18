import type { Metadata } from 'next';

import { Auth } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Авторизация',
};

export default function AuthPage() {
  return <Auth />;
}
