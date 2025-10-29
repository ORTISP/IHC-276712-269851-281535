import ApiService from './baseApi';

class FormService {
  static async getDietTypes() {
    try {
      // TODO: Replace with actual endpoint when available
      // return ApiService.get('/diets');
      return [
        { value: 'omnivora', label: 'Omnívora' },
        { value: 'vegetariana', label: 'Vegetariana' },
        { value: 'vegana', label: 'Vegana' },
        { value: 'keto', label: 'Keto' },
        { value: 'paleo', label: 'Paleo' },
        { value: 'mediterranea', label: 'Mediterránea' },
      ];
    } catch (error) {
      console.error('Error fetching diet types:', error);
      return [];
    }
  }

  static async getRestrictionsAndAllergies() {
    try {
      // TODO: Replace with actual endpoint when available
      // return ApiService.get('/restrictions');
      return [
        { value: 'gluten', label: 'Gluten' },
        { value: 'lactosa', label: 'Lactosa' },
        { value: 'huevos', label: 'Huevos' },
        { value: 'pescado', label: 'Pescado' },
        { value: 'mariscos', label: 'Mariscos' },
        { value: 'nueces', label: 'Nueces' },
        { value: 'soja', label: 'Soja' },
        { value: 'frutos_secos', label: 'Frutos Secos' },
      ];
    } catch (error) {
      console.error('Error fetching restrictions:', error);
      return [];
    }
  }

  static async getNutritionalObjectives() {
    try {
      // TODO: Replace with actual endpoint when available
      // return ApiService.get('/nutritional-objectives');
      return [
        { value: 'perder_peso', label: 'Perder Peso' },
        { value: 'ganar_peso', label: 'Ganar Peso' },
        { value: 'mantener_peso', label: 'Mantener Peso' },
        { value: 'ganar_musculo', label: 'Ganar Músculo' },
        { value: 'mejorar_salud', label: 'Mejorar Salud General' },
        { value: 'deporte', label: 'Mejorar Rendimiento Deportivo' },
      ];
    } catch (error) {
      console.error('Error fetching nutritional objectives:', error);
      return [];
    }
  }
}

export default FormService;

