import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function CreateMenuScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [extension, setExtension] = useState("");
  const [showExtensionPicker, setShowExtensionPicker] = useState(false);

  const extensionOptions = ["Diario", "Semanal", "Mensual"];

  const handleSelectExtension = (option) => {
    setExtension(option);
    setShowExtensionPicker(false);
  };

  const handleCreate = () => {
    console.log("[v0] Crear menú:", { nombre, extension });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Crear un Menú</Text>

        {/* Form */}
        <View style={styles.form}>
          {/* Nombre Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ingresa el nombre del menú"
            />
          </View>

          {/* Extensión Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Extensión</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowExtensionPicker(true)}
            >
              <Text
                style={[styles.dropdownText, !extension && styles.placeholder]}
              >
                {extension || "Diario, semanal o mensual"}
              </Text>
              <Feather name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Create Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Text style={styles.createButtonText}>Crear Menú</Text>
            <Feather name="arrow-right" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showExtensionPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowExtensionPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowExtensionPicker(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona la extensión</Text>
              <TouchableOpacity onPress={() => setShowExtensionPicker(false)}>
                <Feather name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {extensionOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  extension === option && styles.optionItemSelected,
                ]}
                onPress={() => handleSelectExtension(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    extension === option && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {extension === option && (
                  <Feather name="check" size={20} color="#5B5FED" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    borderBottomColor: "#EEE",
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 32,
    textAlign: "center",
  },
  form: {
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  dropdownInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
  },
  createButton: {
    flexDirection: "row",
    backgroundColor: "#000000ff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  createButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  dropdownInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionItemSelected: {
    backgroundColor: "#F0F0FF",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionTextSelected: {
    color: "#5B5FED",
    fontWeight: "600",
  },
});
