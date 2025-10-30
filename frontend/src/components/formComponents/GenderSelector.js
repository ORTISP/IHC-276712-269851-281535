import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";

const GenderSelector = ({
  label,
  value,
  onChange,
  options = ["Masculino", "Femenino", "Otro"],
  className,
  style,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const placeholder = "Seleccionar género";

  return (
    <View className={`mb-4 ${className || ""}`} style={style}>
      {label && (
        <Text
          className="text-base font-semibold text-gray-900 mb-2"
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#111827",
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        className="flex-row justify-between items-center border border-gray-300 rounded-lg px-4 py-2 bg-white"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: "#ffffff",
        }}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text
          className={`text-base flex-1 ${
            !value ? "text-gray-500" : "text-gray-900"
          }`}
          style={{
            fontSize: 16,
            flex: 1,
            color: !value ? "#6b7280" : "#111827",
          }}
        >
          {value || placeholder}
        </Text>
        <Text
          className="text-gray-500"
          style={{
            fontSize: 12,
            color: "#6b7280",
          }}
        >
          ▼
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          className="flex-1 bg-black/50 justify-end"
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            className="bg-white rounded-t-3xl max-h-[70%] pb-6"
            style={{
              backgroundColor: "#ffffff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "70%",
              paddingBottom: 24,
            }}
          >
            <View
              className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 24,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#e5e7eb",
              }}
            >
              <Text
                className="text-2xl font-semibold text-gray-900"
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                {label || "Seleccionar género"}
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="p-2"
                style={{
                  padding: 8,
                }}
              >
                <Text
                  className="text-base text-blue-500 font-semibold"
                  style={{
                    fontSize: 16,
                    color: "#3b82f6",
                    fontWeight: "600",
                  }}
                >
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              className="px-6 pt-4"
              style={{
                paddingHorizontal: 24,
                paddingTop: 16,
              }}
            >
              {options.map((option, index) => {
                const isSelected = value === option;

                return (
                  <TouchableOpacity
                    key={index}
                    className={`py-4 px-4 rounded-lg mb-2 border ${
                      isSelected
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-200"
                    }`}
                    style={[
                      {
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        marginBottom: 8,
                        borderWidth: 1,
                      },
                      isSelected
                        ? {
                            backgroundColor: "#3b82f6",
                            borderColor: "#3b82f6",
                          }
                        : {
                            backgroundColor: "#ffffff",
                            borderColor: "#e5e7eb",
                          },
                    ]}
                    onPress={() => {
                      onChange(option);
                      setIsModalVisible(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      className={`text-base ${
                        isSelected
                          ? "text-white font-semibold"
                          : "text-gray-900"
                      }`}
                      style={{
                        fontSize: 16,
                        color: isSelected ? "#ffffff" : "#111827",
                        fontWeight: isSelected ? "600" : "400",
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GenderSelector;
