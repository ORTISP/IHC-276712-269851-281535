import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN_KEY = "@auth_token";
const USER_ID_KEY = "@user_id";

const authStorage = {
  // Save authentication token
  saveToken: async (token) => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving token:", error);
      throw error;
    }
  },

  // Get authentication token
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  // Remove authentication token
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_ID_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
      throw error;
    }
  },

  // Save user ID
  saveUserId: async (userId) => {
    try {
      await AsyncStorage.setItem(USER_ID_KEY, userId.toString());
    } catch (error) {
      console.error("Error saving user ID:", error);
      throw error;
    }
  },

  // Get user ID
  getUserId: async () => {
    try {
      const userId = await AsyncStorage.getItem(USER_ID_KEY);
      return userId ? parseInt(userId, 10) : null;
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  },
};

export default authStorage;
