import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';

const FormContent = ({ 
  currentStep, 
  formData,
  formActions,
  onWhyWeAskPress,
}) => {
  const stepTitles = {
    1: { title: 'Información Personal', subtitle: 'Cuéntanos sobre ti' },
    2: { title: 'Detalles Adicionales', subtitle: 'Completa tu perfil' },
  };

  const currentTitle = stepTitles[currentStep];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep1
            name={formData.name}
            setName={formActions.setName}
            dateOfBirth={formData.dateOfBirth}
            setDateOfBirth={formActions.setDateOfBirth}
            gender={formData.gender}
            setGender={formActions.setGender}
          />
        );
      case 2:
        return (
          <FormStep2
            dietType={formData.dietType}
            setDietType={formActions.setDietType}
            restrictions={formData.restrictions}
            setRestrictions={formActions.setRestrictions}
            nutritionalObjective={formData.nutritionalObjective}
            setNutritionalObjective={formActions.setNutritionalObjective}
            privateRecipes={formData.privateRecipes}
            setPrivateRecipes={formActions.setPrivateRecipes}
            dietTypes={formData.dietTypes}
            restrictionsOptions={formData.restrictionsOptions}
            nutritionalObjectives={formData.nutritionalObjectives}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 px-6 py-6">
      {/* Header */}
      <View
        className="mb-8"
        style={{
          marginBottom: 32,
          alignItems: 'center',
        }}
      >
        <Text
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: '#111827',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          {currentTitle?.title}
        </Text>
        <Text
          className="text-base text-gray-600"
          style={{
            fontSize: 16,
            color: '#4b5563',
            textAlign: 'center',
          }}
        >
          {currentTitle?.subtitle}
        </Text>
      </View>

      {/* Form Content */}
      {renderStep()}

      {/* Why we ask button */}
      <View
        style={{
          alignItems: 'center',
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={onWhyWeAskPress}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          activeOpacity={0.7}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#3b82f6',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            ¿Por qué pedimos esto?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormContent;

