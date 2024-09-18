import type { TypeIconName } from '@/components/ui';

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: TypeIconName;
}

export interface GenreEditInput extends Omit<Genre, 'id'> {}
