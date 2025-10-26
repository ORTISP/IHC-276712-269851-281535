import ApiService from './baseApi';

class AuthService {
  static async register(userData) {
    return ApiService.post('/auth/register', userData);
  }

  static async login(credentials) {
    return ApiService.post('/auth/login', credentials);
  }

  static async logout() {
    return ApiService.post('/auth/logout');
  }

  static async getProfile() {
    return ApiService.get('/auth/me');
  }

  static async refreshToken() {
    return ApiService.post('/auth/refresh');
  }

  static async forgotPassword(email) {
    return ApiService.post('/auth/forgot-password', { email });
  }

  static async resetPassword(token, newPassword) {
    return ApiService.post('/auth/reset-password', { token, newPassword });
  }

  static async changePassword(currentPassword, newPassword) {
    return ApiService.post('/auth/change-password', { 
      currentPassword, 
      newPassword 
    });
  }
}

export default AuthService;
