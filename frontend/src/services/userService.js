import ApiService from './baseApi';

class UserService {
  static async getAllUsers() {
    return ApiService.get('/users');
  }

  static async getUserById(id) {
    return ApiService.get(`/users/${id}`);
  }

  static async createUser(userData) {
    return ApiService.post('/users', userData);
  }

  static async updateUser(id, userData) {
    return ApiService.put(`/users/${id}`, userData);
  }

  static async deleteUser(id) {
    return ApiService.delete(`/users/${id}`);
  }

  static async updateProfile(userData) {
    return ApiService.put('/users/profile', userData);
  }

  static async uploadAvatar(imageData) {
    return ApiService.post('/users/avatar', imageData);
  }

  static async searchUsers(query) {
    return ApiService.get(`/users/search?q=${encodeURIComponent(query)}`);
  }

  static async getUserStats(id) {
    return ApiService.get(`/users/${id}/stats`);
  }
}

export default UserService;
