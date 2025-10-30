import { useState } from "react";
import UserService from "../../services/userService";

export const useFormSubmission = (userId, navigation) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");

  const showToast = (message, type = "error") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const submitForm = async (formData) => {
    if (!userId) {
      navigation.navigate("FinishForm");
      return;
    }

    try {
      // Format date for API
      const formattedDateOfBirth = formData.dateOfBirth
        ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
        : undefined;

      // Prepare update data
      const updateData = {
        name: formData.name || undefined,
        dateOfBirth: formattedDateOfBirth,
        gender: formData.gender || undefined,
        dietType: formData.dietType || undefined,
        restrictions:
          formData.restrictions && formData.restrictions.length > 0
            ? formData.restrictions
            : undefined,
        nutritionalObjective: formData.nutritionalObjective || undefined,
        privateRecipes: formData.privateRecipes,
      };

      // Remove undefined values
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );

      await UserService.updateUser(userId, updateData);
      console.log("Form data saved successfully");
      showToast("Datos guardados exitosamente", "success");

      // Small delay before navigation to show success message
      setTimeout(() => {
        navigation.navigate("FinishForm");
      }, 1000);
    } catch (error) {
      console.error("Error saving form data:", error);

      // Extract error message
      let errorMessage =
        "Error al guardar los datos. Por favor intenta nuevamente";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error but don't navigate - let user fix the issue
      showToast(errorMessage, "error");
    }
  };

  return {
    toastVisible,
    toastMessage,
    toastType,
    showToast,
    hideToast,
    submitForm,
  };
};
