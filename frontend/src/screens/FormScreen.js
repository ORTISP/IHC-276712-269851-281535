import React, { useState } from "react";
import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Toast from "../components/shared/Toast";
import FormHeader from "../components/formComponents/FormHeader";
import FormDrawer from "./form/FormDrawer";
import FormContent from "./form/FormContent";
import NextStepButton from "./form/NextStepButton";
import { useFormData } from "./form/useFormData";
import { useFormSubmission } from "./form/useFormSubmission";

const FormScreen = ({ navigation, route }) => {
  const userId = route?.params?.userId;
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Custom hooks for form logic
  const formData = useFormData(currentStep);
  const { toastVisible, toastMessage, toastType, hideToast, submitForm } =
    useFormSubmission(userId, navigation);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    navigation.navigate("Welcome");
  };

  const handleNextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form data
      await submitForm({
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        dietType: formData.dietType,
        restrictions: formData.restrictions,
        nutritionalObjective: formData.nutritionalObjective,
        privateRecipes: formData.privateRecipes,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <FormHeader
        onBack={handleBack}
        onSkip={handleSkip}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <FormContent
          currentStep={currentStep}
          formData={{
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            dietType: formData.dietType,
            restrictions: formData.restrictions,
            nutritionalObjective: formData.nutritionalObjective,
            privateRecipes: formData.privateRecipes,
            dietTypes: formData.dietTypes,
            restrictionsOptions: formData.restrictionsOptions,
            nutritionalObjectives: formData.nutritionalObjectives,
          }}
          formActions={{
            setName: formData.setName,
            setDateOfBirth: formData.setDateOfBirth,
            setGender: formData.setGender,
            setDietType: formData.setDietType,
            setRestrictions: formData.setRestrictions,
            setNutritionalObjective: formData.setNutritionalObjective,
            setPrivateRecipes: formData.setPrivateRecipes,
          }}
          onWhyWeAskPress={() => setIsDrawerVisible(true)}
        />

        <NextStepButton
          onPress={handleNextStep}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      </ScrollView>

      <FormDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
      />

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={hideToast}
      />
    </SafeAreaView>
  );
};

export default FormScreen;
