import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function ViewMenuScreen({ navigation, route }) {
  const [selectedDay, setSelectedDay] = useState("Lunes")
  const menuName = route?.params?.menu?.name || "Mi Nuevo Menú"

  // Estructura: { 'LUN-0': [true, false, true, false], 'LUN-1': [false, false, false, false], ... }
  const [cellStates, setCellStates] = useState({})

  const days = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"]
  const tabs = ["Lunes", "Martes", "Miércoles"]

  const emojis = ["🍳", "🍽️", "🥤", "🌙"]

  const handleDelete = () => {
    console.log("[v0] Eliminar menú")
  }

  const handleAdd = () => {
    console.log("[v0] Agregar comida al día")
  }

  const handleEmojiPress = (day, col, emojiIndex) => {
    const cellKey = `${day}-${col}`
    const currentState = cellStates[cellKey] || [false, false, false, false]
    const newState = [...currentState]
    newState[emojiIndex] = !newState[emojiIndex]

    setCellStates({
      ...cellStates,
      [cellKey]: newState,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => console.log("[v0] Volver")}>
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

      <View style={styles.tagsContainer}>
        <View style={[styles.tag, styles.tagGreen]}>
          <Text style={styles.tagText}>$ 200/día</Text>
        </View>
        <View style={[styles.tag, styles.tagOrange]}>
          <Text style={styles.tagText}>1500 cal/día</Text>
        </View>
        <View style={[styles.tag, styles.tagBlue]}>
          <Text style={styles.tagText}>Mensual</Text>
        </View>
      </View>

      <ScrollView style={styles.content} horizontal={false}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <View style={styles.table}>
            {/* Header row con columnas */}
            <View style={styles.headerRow}>
              <View style={styles.dayHeaderCell} />
              {[1, 2, 3, 4, 5].map((col) => (
                <View key={col} style={styles.columnHeaderCell}>
                  <Text style={styles.columnHeaderText}>Col {col}</Text>
                </View>
              ))}
            </View>

            {/* Filas de días */}
            {days.map((day) => (
              <View key={day} style={styles.tableRow}>
                <View style={styles.dayCell}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>

                {/* 5 columnas por cada día */}
                {[0, 1, 2, 3, 4].map((col) => {
                  const cellKey = `${day}-${col}`
                  const cellState = cellStates[cellKey] || [false, false, false, false]

                  return (
                    <View key={col} style={styles.gridCell}>
                      <View style={styles.emojiContainer}>
                        {emojis.map((emoji, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.emojiButton}
                            onPress={() => handleEmojiPress(day, col, index)}
                          >
                            <Text style={[styles.emoji, cellState[index] && styles.emojiActive]}>{emoji}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 12,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagGreen: {
    backgroundColor: "#E8F5E9",
  },
  tagOrange: {
    backgroundColor: "#FFF3E0",
  },
  tagBlue: {
    backgroundColor: "#E3F2FD",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  table: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#DDD",
    backgroundColor: "#F8F8F8",
  },
  dayHeaderCell: {
    width: 70,
    borderRightWidth: 1,
    borderRightColor: "#DDD",
  },
  columnHeaderCell: {
    width: 100,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#DDD",
  },
  columnHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  dayCell: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: "#DDD",
    backgroundColor: "#FAFAFA",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  gridCell: {
    width: 100,
    minHeight: 80,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#EEE",
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 20,
    opacity: 0.3,
  },
  emojiActive: {
    opacity: 1,
  },
})
