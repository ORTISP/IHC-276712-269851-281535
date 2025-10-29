import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Card from '../components/shared/Card';
import Input from '../components/shared/Input';
import FormHeader from '../components/formComponents/FormHeader';
import DatePicker from '../components/formComponents/DatePicker';
import GenderSelector from '../components/formComponents/GenderSelector';
import SelectField from '../components/formComponents/SelectField';
import MultiSelectField from '../components/formComponents/MultiSelectField';
import ToggleButton from '../components/formComponents/ToggleButton';
import FormService from '../services/formService';

const FormScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // Step 1 form data
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState('');

  // Step 2 form data
  const [dietType, setDietType] = useState('');
  const [restrictions, setRestrictions] = useState([]);
  const [nutritionalObjective, setNutritionalObjective] = useState('');
  const [privateRecipes, setPrivateRecipes] = useState(false);

  // Options from database
  const [dietTypes, setDietTypes] = useState([]);
  const [restrictionsOptions, setRestrictionsOptions] = useState([]);
  const [nutritionalObjectives, setNutritionalObjectives] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Drawer state
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

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
        console.error('Error loading form options:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentStep === 2) {
      loadOptions();
    }
  }, [currentStep]);

  const handleBack = () => {
    if (currentStep > 1) {
      // Go back one step in the form
      setCurrentStep(currentStep - 1);
    } else {
      // If on step 1, navigate back to previous screen
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    // Navigate to Welcome screen
    navigation.navigate('Welcome');
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // If on last step, navigate to FinishFormScreen
      navigation.navigate('FinishForm');
    }
  };

  const renderStep1 = () => {
    return (
      <Card className="p-6">
        <Input
          label="Nombre"
          placeholder="Ingresa tu nombre completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <DatePicker
          label="Fecha de Nacimiento"
          value={dateOfBirth}
          onChange={setDateOfBirth}
        />

        <GenderSelector
          label="Género"
          value={gender}
          onChange={setGender}
          options={['Masculino', 'Femenino', 'Otro']}
        />
      </Card>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return (
          <Card className="p-6">
            <SelectField
              label="Tipo de Dieta"
              value={dietType}
              options={dietTypes}
              onChange={setDietType}
              placeholder="Selecciona tu tipo de dieta"
            />

            <MultiSelectField
              label="Restricciones o Alergias"
              value={restrictions}
              options={restrictionsOptions}
              onChange={setRestrictions}
              placeholder="Selecciona tus restricciones o alergias"
            />

            <SelectField
              label="Objetivo Nutricional"
              value={nutritionalObjective}
              options={nutritionalObjectives}
              onChange={setNutritionalObjective}
              placeholder="Selecciona tu objetivo nutricional"
            />

            <ToggleButton
              label="Recetas Privadas"
              value={privateRecipes}
              onValueChange={setPrivateRecipes}
            />
          </Card>
        );
      default:
        return renderStep1();
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
              {currentStep === 1 && 'Información Personal'}
              {currentStep === 2 && 'Detalles Adicionales'}
            </Text>
            <Text
              className="text-base text-gray-600"
              style={{
                fontSize: 16,
                color: '#4b5563',
                textAlign: 'center',
              }}
            >
              {currentStep === 1 && 'Cuéntanos sobre ti'}
              {currentStep === 2 && 'Completa tu perfil'}
            </Text>
          </View>

          {/* Form Content */}
          {renderCurrentStep()}

          {/* Why we ask button */}
          <View
            style={{
              alignItems: 'center',
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => setIsDrawerVisible(true)}
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

          {/* Next Step Arrow */}
          {currentStep <= totalSteps && (
            <View
              className="items-center mt-8 mb-6"
              style={{
                alignItems: 'center',
                marginTop: 32,
                marginBottom: 24,
              }}
            >
              <TouchableOpacity
                className="w-14 h-14 rounded-full bg-blue-500 justify-center items-center shadow-md"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#3b82f6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                onPress={handleNextStep}
                activeOpacity={0.8}
              >
                <Text
                  className="text-3xl text-white font-bold"
                  style={{
                    fontSize: 32,
                    color: '#ffffff',
                    fontWeight: '700',
                  }}
                >
                  →
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Drawer Modal */}
      <Modal
        visible={isDrawerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDrawerVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: '80%',
              paddingTop: 24,
              paddingBottom: 32,
            }}
          >
            {/* Handle bar */}
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#d1d5db',
                borderRadius: 2,
                alignSelf: 'center',
                marginBottom: 24,
              }}
            />

            {/* Content */}
            <ScrollView
              style={{
                paddingHorizontal: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#111827',
                  lineHeight: 24,
                  marginBottom: 24,
                }}
              >
                La recopilación de información sobre la dieta de un usuario es fundamental para comprender sus hábitos alimenticios y su estado nutricional. Estos datos permiten ofrecer recomendaciones personalizadas, mejorar la precisión de los análisis de salud y promover decisiones informadas que favorezcan el bienestar general.
                {'\n\n'}
                Al conocer los tipos de alimentos que consume, las porciones, la frecuencia y los horarios de las comidas, es posible identificar posibles deficiencias, excesos o desequilibrios nutricionales. Esto facilita la elaboración de planes alimentarios adaptados a las necesidades, objetivos y condiciones particulares de cada persona.
                {'\n\n'}
                Además, el registro de la dieta contribuye al seguimiento de progresos a lo largo del tiempo, la prevención de enfermedades relacionadas con la alimentación y la evaluación del impacto de cambios en el estilo de vida. Toda la información se maneja de forma confidencial y se utiliza únicamente con fines de evaluación, mejora o acompañamiento nutricional.
              </Text>
            </ScrollView>

            {/* Close Button */}
            <View
              style={{
                paddingHorizontal: 24,
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor: '#e5e7eb',
              }}
            >
              <TouchableOpacity
                onPress={() => setIsDrawerVisible(false)}
                style={{
                  backgroundColor: '#3b82f6',
                  paddingVertical: 14,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: '#ffffff',
                    fontWeight: '600',
                  }}
                >
                  Entiendo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FormScreen;

