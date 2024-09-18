import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from './common/constants';
import { EnumTokens } from './common/services/auth';
import { userService } from './common/services/user.service';
import { UserRole } from './types/user.types';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthorized = accessToken && refreshToken;

  const isAuthPage = request.url.includes(PUBLIC_ROUTES.auth());
  const isAdminPage = request.url.includes(ADMIN_ROUTES.root());

  if (isAuthPage) {
    if (isAuthorized) {
      return NextResponse.redirect(new URL(PUBLIC_ROUTES.home(), request.url));
    }

    return NextResponse.next();
  }

  if (!isAuthorized) {
    if (isAdminPage) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    return NextResponse.redirect(new URL(PUBLIC_ROUTES.auth(), request.url));
  }

  try {
    const { data } = await userService.getProfile(refreshToken);

    if (data.role === UserRole.ADMIN) {
      return NextResponse.next();
    }

    if (isAdminPage) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.auth(), request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/manage/:path*', '/auth'],
};
