import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/common/utils';
import type { AuthResponse } from '@/types/auth.types';
import type { User } from '@/types/user.types';

export enum EnumTokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export enum EnumStorage {
  USER = 'user',
}

export const getAccessToken = () => {
  const token = getLocalStorageItem<string>(EnumTokens.ACCESS_TOKEN);

  return token || null;
};

export const getUserFromStorage = () => {
  return getLocalStorageItem<User>('user');
};

export const saveAccessToken = (token: string) => {
  setLocalStorageItem(EnumTokens.ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  removeLocalStorageItem(EnumTokens.ACCESS_TOKEN);
};

export const saveToStorage = (data: AuthResponse) => {
  saveAccessToken(data.accessToken);
  setLocalStorageItem('user', data.user);
};

export const removeFromStorage = () => {
  removeAccessToken();
  removeLocalStorageItem('user');
};
