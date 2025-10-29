import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const FormHeader = ({ onBack, onSkip, currentStep = 1, totalSteps = 3 }) => {
  const renderStepDots = () => {
    return Array.from({ length: totalSteps }, (_, index) => {
      const stepNumber = index + 1;
      const isActive = stepNumber === currentStep;
      
      return (
        <View
          key={stepNumber}
          className={`${isActive ? 'w-2.5 h-2.5 rounded-full bg-blue-500' : 'w-2 h-2 rounded-full bg-gray-300'}`}
          style={{
            width: isActive ? 10 : 8,
            height: isActive ? 10 : 8,
            borderRadius: isActive ? 5 : 4,
            backgroundColor: isActive ? '#3b82f6' : '#d1d5db',
            marginHorizontal: 4,
          }}
        />
      );
    });
  };

  return (
    <View
      className="flex-row justify-between items-center px-6 py-4 bg-white"
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      }}
    >
      <TouchableOpacity
        className="py-2 px-4 flex-1"
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          flex: 1,
        }}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <Text
          className="text-2xl text-gray-900 font-semibold"
          style={{
            fontSize: 24,
            color: '#111827',
            fontWeight: '600',
          }}
        >
          ←
        </Text>
      </TouchableOpacity>

      <View
        className="flex-row items-center justify-center flex-1 gap-2"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        {renderStepDots()}
      </View>

      <TouchableOpacity
        className="py-2 px-4 flex-1 items-end"
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          flex: 1,
          alignItems: 'flex-end',
        }}
        onPress={onSkip}
        activeOpacity={0.8}
      >
        <Text
          className="text-base text-blue-500 font-medium"
          style={{
            fontSize: 16,
            color: '#3b82f6',
            fontWeight: '500',
          }}
        >
          Omitir
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormHeader;

