import { api } from '@/common/api';
import { saveAccessToken, saveToStorage, removeFromStorage } from './token.service';
import { API } from '@/common/constants';
import type { AuthForm, AuthResponse } from '@/types/auth.types';

class AuthService {
  async main(type: 'login' | 'register', values: AuthForm) {
    const { data } = await api.post<AuthResponse>(API.auth(`${type}`), values);

    saveToStorage(data);
    return data;
  }

  async logout() {
    await api.post(API.auth('logout'));
    removeFromStorage();
  }

  async getNewTokens() {
    try {
      const { data: accessToken } = await api.post<string>(API.auth('refresh'));

      saveAccessToken(accessToken);
    } catch (err) {
      throw err;
    }
  }
}

export const authService = new AuthService();
