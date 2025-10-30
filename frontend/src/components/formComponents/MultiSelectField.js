import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";

const MultiSelectField = ({
  label,
  value = [],
  options = [],
  onChange,
  placeholder = "Seleccionar...",
  className,
  style,
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleOption = (optionValue) => {
    const newValue = [...value];
    const index = newValue.indexOf(optionValue);

    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(optionValue);
    }

    onChange(newValue);
  };

  const getSelectedLabels = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) {
      const option = options.find(
        (opt) => (opt.value !== undefined ? opt.value : opt) === value[0]
      );
      return option ? option.label || option : value[0];
    }
    return `${value.length} seleccionados`;
  };

  return (
    <View className={`mb-4 ${className || ""}`} style={style}>
      {label && (
        <Text className="text-base font-semibold text-gray-900 mb-2">
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
            value.length === 0 ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {getSelectedLabels()}
        </Text>
        <Text className="text-gray-500">▼</Text>
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
            <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
              <Text className="text-2xl font-semibold text-gray-900">
                {label}
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="p-2"
              >
                <Text className="text-base text-blue-500 font-semibold">
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="px-6 pt-4">
              {options.map((option, index) => {
                const optionValue =
                  option.value !== undefined ? option.value : option;
                const optionLabel = option.label || option;
                const isSelected = value.includes(optionValue);

                return (
                  <TouchableOpacity
                    key={index}
                    className={`flex-row items-center py-4 px-4 rounded-lg mb-2 border ${
                      isSelected
                        ? "bg-blue-100 border-blue-500"
                        : "bg-white border-gray-200"
                    }`}
                    style={[
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        marginBottom: 8,
                        borderWidth: 1,
                      },
                      isSelected
                        ? {
                            backgroundColor: "#dbeafe",
                            borderColor: "#3b82f6",
                          }
                        : {
                            backgroundColor: "#ffffff",
                            borderColor: "#e5e7eb",
                          },
                    ]}
                    onPress={() => toggleOption(optionValue)}
                    activeOpacity={0.8}
                  >
                    <View
                      className={`w-5 h-5 rounded border-2 mr-3 justify-center items-center ${
                        isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                      style={[
                        {
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          borderWidth: 2,
                          marginRight: 12,
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        isSelected
                          ? {
                              borderColor: "#3b82f6",
                              backgroundColor: "#3b82f6",
                            }
                          : {
                              borderColor: "#d1d5db",
                            },
                      ]}
                    >
                      {isSelected && (
                        <Text className="text-white text-xs">✓</Text>
                      )}
                    </View>
                    <Text
                      className={`text-base flex-1 ${
                        isSelected
                          ? "text-gray-900 font-medium"
                          : "text-gray-900"
                      }`}
                    >
                      {optionLabel}
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

export default MultiSelectField;
