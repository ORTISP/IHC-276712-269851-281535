import React from "react";
import { View, Text, TextInput } from "react-native";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  className,
  style,
  ...props
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-semibold text-gray-900 mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={`border border-gray-300 rounded-lg px-4 py-2 text-base bg-white text-gray-900 ${
          className || ""
        }`}
        style={[
          {
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontSize: 16,
            backgroundColor: "#ffffff",
            color: "#111827",
          },
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor="#6b7280"
        {...props}
      />
    </View>
  );
};

export default Input;
