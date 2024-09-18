import { MainLayoutComponent } from '@/layouts';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <MainLayoutComponent>{children}</MainLayoutComponent>;
}
