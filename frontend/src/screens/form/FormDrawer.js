import React from "react";
import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";

const FormDrawer = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: "80%",
            paddingTop: 24,
            paddingBottom: 32,
          }}
        >
          {/* Handle bar */}
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: "#d1d5db",
              borderRadius: 2,
              alignSelf: "center",
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
                color: "#111827",
                lineHeight: 24,
                marginBottom: 24,
              }}
            >
              La recopilación de información sobre la dieta de un usuario es
              fundamental para comprender sus hábitos alimenticios y su estado
              nutricional. Estos datos permiten ofrecer recomendaciones
              personalizadas, mejorar la precisión de los análisis de salud y
              promover decisiones informadas que favorezcan el bienestar
              general.
              {"\n\n"}
              Al conocer los tipos de alimentos que consume, las porciones, la
              frecuencia y los horarios de las comidas, es posible identificar
              posibles deficiencias, excesos o desequilibrios nutricionales.
              Esto facilita la elaboración de planes alimentarios adaptados a
              las necesidades, objetivos y condiciones particulares de cada
              persona.
              {"\n\n"}
              Además, el registro de la dieta contribuye al seguimiento de
              progresos a lo largo del tiempo, la prevención de enfermedades
              relacionadas con la alimentación y la evaluación del impacto de
              cambios en el estilo de vida. Toda la información se maneja de
              forma confidencial y se utiliza únicamente con fines de
              evaluación, mejora o acompañamiento nutricional.
            </Text>
          </ScrollView>

          {/* Close Button */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: "#e5e7eb",
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: "#3b82f6",
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#ffffff",
                  fontWeight: "600",
                }}
              >
                Entiendo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FormDrawer;
