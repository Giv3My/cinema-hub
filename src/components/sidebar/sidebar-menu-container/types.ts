import type { TypeIconName } from '@/components/ui';

export interface MenuItem {
  icon: TypeIconName;
  value: string;
  link: string;
}

export interface Menu {
  title: string;
  items: MenuItem[];
}
