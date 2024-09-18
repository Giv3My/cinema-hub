import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import cn from 'clsx';

import { PUBLIC_ROUTES } from '@/common/constants';

import { Heading } from '@/components/ui';
import logo from '@/assets/images/logo.svg';
import styles from './sidebar-logo.module.scss';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export const SidebarLogo: React.FC = () => {
  return (
    <Link href={PUBLIC_ROUTES.home()} className={styles.logo}>
      <Image src={logo} width={50} height={50} alt="logo" />
      <Heading className={cn('text-2xl font-semibold text-white', font.className)}>
        Cinema<span className={`text-primary`}>Hub</span>
      </Heading>
    </Link>
  );
};
