import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ToggleButton = ({ label, value, onValueChange, className, style }) => {
  return (
    <View className={`mb-4 ${className || ""}`} style={style}>
      {label && (
        <Text className="text-base font-semibold text-gray-900 mb-2">
          {label}
        </Text>
      )}
      <TouchableOpacity
        className={`flex-row items-center w-14 h-8 rounded-full p-1 ${
          value ? "bg-blue-500" : "bg-gray-300"
        }`}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: value ? "flex-end" : "flex-start",
          width: 56,
          height: 32,
          borderRadius: 16,
          padding: 4,
          backgroundColor: value ? "#3b82f6" : "#d1d5db",
        }}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.8}
      >
        <View
          className="w-6 h-6 rounded-full bg-white"
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#ffffff",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButton;
