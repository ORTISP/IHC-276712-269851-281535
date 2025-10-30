import { useState, useEffect } from "react";
import FormService from "../../services/formService";

export const useFormData = (currentStep) => {
  // Step 1 form data
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");

  // Step 2 form data
  const [dietType, setDietType] = useState("");
  const [restrictions, setRestrictions] = useState([]);
  const [nutritionalObjective, setNutritionalObjective] = useState("");
  const [privateRecipes, setPrivateRecipes] = useState(false);

  // Options from database
  const [dietTypes, setDietTypes] = useState([]);
  const [restrictionsOptions, setRestrictionsOptions] = useState([]);
  const [nutritionalObjectives, setNutritionalObjectives] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load options from database
  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      try {
        const [diets, restrictionsData, objectives] = await Promise.all([
          FormService.getDietTypes(),
          FormService.getRestrictionsAndAllergies(),
          FormService.getNutritionalObjectives(),
        ]);
        setDietTypes(diets);
        setRestrictionsOptions(restrictionsData);
        setNutritionalObjectives(objectives);
      } catch (error) {
        console.error("Error loading form options:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentStep === 2) {
      loadOptions();
    }
  }, [currentStep]);

  return {
    // Step 1 data
    name,
    setName,
    dateOfBirth,
    setDateOfBirth,
    gender,
    setGender,
    // Step 2 data
    dietType,
    setDietType,
    restrictions,
    setRestrictions,
    nutritionalObjective,
    setNutritionalObjective,
    privateRecipes,
    setPrivateRecipes,
    // Options
    dietTypes,
    restrictionsOptions,
    nutritionalObjectives,
    loading,
  };
};
