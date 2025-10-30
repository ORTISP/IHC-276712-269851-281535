import { View, Text, TouchableOpacity } from "react-native";

const NextStepButton = ({ onPress, currentStep, totalSteps }) => {
  if (currentStep > totalSteps) {
    return null;
  }

  return (
    <View
      className="items-center mt-8 mb-6"
      style={{
        alignItems: "center",
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
          backgroundColor: "#3b82f6",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text
          className="text-3xl text-white font-bold"
          style={{
            fontSize: 32,
            color: "#ffffff",
            fontWeight: "700",
          }}
        >
          →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextStepButton;
