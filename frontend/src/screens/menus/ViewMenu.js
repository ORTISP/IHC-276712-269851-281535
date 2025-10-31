"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function ViewMenuScreen({ navigation, route }) {
  const menuName = route?.params?.menu?.name || "Mi Nuevo Menú";

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  // Días abreviados
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const emojis = ["🍳", "🍽️", "🥤", "🌙"];
  const mealKeys = ["breakfast", "lunch", "snack", "dinner"];

  // 🔹 Array de 28 objetos, uno por cada día
  const [menuData, setMenuData] = useState([
    { breakfast: true, lunch: true }, // Día 0
    { snack: true },                  // Día 1
    {},                               // Día 2
    { dinner: true },                 // Día 3
    { breakfast: true, snack: true }, // Día 4
    {},                               // Día 5
    {},                               // Día 6
    { breakfast: true },              // Día 7
    { lunch: true },                  // Día 8
    {},                               // Día 9
    { dinner: true },                 // Día 10
    {},                               // Día 11
    { snack: true },                  // Día 12
    {},                               // Día 13
    {},                               // Día 14
    { breakfast: true, lunch: true }, // Día 15
    {},                               // Día 16
    { dinner: true },                 // Día 17
    {},                               // Día 18
    { snack: true },                  // Día 19
    {},                               // Día 20
    { breakfast: true },              // Día 21
    {},                               // Día 22
    { lunch: true, dinner: true },    // Día 23
    {},                               // Día 24
    { snack: true },                  // Día 25
    {},                               // Día 26
    {},                               // Día 27
  ]);

  const handleDelete = () => console.log("[v0] Eliminar menú");
  const handleAdd = () => console.log("[v0] Agregar comida al día");

  const handleCellPress = (day, col) => {
    const cellKey = `${day}-${col}`;
    setSelectedCell(cellKey);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCell(null);
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
        <Text style={styles.headerTitle}>{menuName}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleAdd}>
            <Feather name="plus" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <Feather name="trash-2" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <View style={[styles.tag, styles.tagGreen]}>
          <Text style={[styles.tagText, styles.tagTextGreen]}>$ 200/día</Text>
        </View>
        <View style={[styles.tag, styles.tagOrange]}>
          <Text style={[styles.tagText, styles.tagTextOrange]}>
            1500 cal/día
          </Text>
        </View>
        <View style={[styles.tag, styles.tagBlue]}>
          <Text style={[styles.tagText, styles.tagTextBlue]}>Mensual</Text>
        </View>
      </View>

      {/* Tabla */}
      <ScrollView style={styles.content} horizontal={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            {days.map((day, dayIndex) => (
              <View key={day} style={styles.tableRow}>
                <View style={styles.dayCell}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>

                {/* 4 columnas por día */}
                {[0, 1, 2, 3].map((col) => {
                  // Calculamos el índice real del día en menuData
                  const dataIndex = dayIndex + col * 7;
                  const data = menuData[dataIndex] || {};

                  return (
                    <TouchableOpacity
                      key={col}
                      style={styles.gridCell}
                      onPress={() => handleCellPress(day, col)}
                      activeOpacity={0.6}
                    >
                      <View style={styles.emojiContainer}>
                        {emojis.map((emoji, index) => (
                          <Text
                            key={index}
                            style={[
                              styles.emoji,
                              data[mealKeys[index]]
                                ? styles.emojiActive
                                : styles.emojiInactive,
                            ]}
                          >
                            {emoji}
                          </Text>
                        ))}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalle de la celda</Text>
            <Text style={styles.modalText}>
              Celda seleccionada: {selectedCell}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: "#EEE",
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: "600", flex: 1, marginLeft: 12 },
  headerActions: { flexDirection: "row", gap: 8 },
  iconButton: { padding: 8 },
  tagsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexWrap: "wrap",
  },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8, marginBottom: 4 },
  tagGreen: { backgroundColor: "#E8F5E9" },
  tagOrange: { backgroundColor: "#FFF3E0" },
  tagBlue: { backgroundColor: "#E3F2FD" },
  tagText: { fontSize: 12, fontWeight: "500" },
  tagTextGreen: { color: "#4CAF50" },
  tagTextOrange: { color: "#FF9800" },
  tagTextBlue: { color: "#2196F3" },
  content: { flex: 1 },
  table: { paddingBottom: 20 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#EEE" },
  dayCell: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: "#DDD",
    backgroundColor: "#FAFAFA",
  },
  dayText: { fontSize: 16, fontWeight: "700", color: "#333" },
  gridCell: {
    width: 95,
    minHeight: 95,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#EEE",
  },
  emojiContainer: { flexDirection: "row", flexWrap: "wrap", gap: 6, justifyContent: "center", alignItems: "center" },
  emoji: { fontSize: 20 },
  emojiActive: { opacity: 1 },             // emojis activos se ven natural
  emojiInactive: { color: "#000", opacity: 0.3 }, // emojis inactivos blanco y negro
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  modalText: { fontSize: 14, color: "#555", marginBottom: 16 },
  closeButton: { backgroundColor: "#2196F3", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  closeButtonText: { color: "#FFF", fontWeight: "600" },
});
