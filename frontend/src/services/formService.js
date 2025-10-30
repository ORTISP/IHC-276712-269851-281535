class FormService {
  static async getDietTypes() {
    // TODO: Replace with actual endpoint when available
    // return ApiService.get('/diets');
    return [
      { value: "omnivora", label: "Omnívora" },
      { value: "vegetariana", label: "Vegetariana" },
      { value: "vegana", label: "Vegana" },
      { value: "keto", label: "Keto" },
      { value: "paleo", label: "Paleo" },
      { value: "mediterranea", label: "Mediterránea" },
    ];
  }

  static async getRestrictionsAndAllergies() {
    // TODO: Replace with actual endpoint when available
    // return ApiService.get('/restrictions');
    return [
      { value: "gluten", label: "Gluten" },
      { value: "lactosa", label: "Lactosa" },
      { value: "huevos", label: "Huevos" },
      { value: "pescado", label: "Pescado" },
      { value: "mariscos", label: "Mariscos" },
      { value: "nueces", label: "Nueces" },
      { value: "soja", label: "Soja" },
      { value: "frutos_secos", label: "Frutos Secos" },
    ];
  }

  static async getNutritionalObjectives() {
    // TODO: Replace with actual endpoint when available
    // return ApiService.get('/nutritional-objectives');
    return [
      { value: "perder_peso", label: "Perder Peso" },
      { value: "ganar_peso", label: "Ganar Peso" },
      { value: "mantener_peso", label: "Mantener Peso" },
      { value: "ganar_musculo", label: "Ganar Músculo" },
      { value: "mejorar_salud", label: "Mejorar Salud General" },
      { value: "deporte", label: "Mejorar Rendimiento Deportivo" },
    ];
  }
}

export default FormService;
