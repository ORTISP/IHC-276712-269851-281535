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
import { FontAwesome, Feather } from "@expo/vector-icons";

export default function MenusScreen({ navigation }) {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Menú Semanal Sano",
      isFavorite: true,
      tags: ["5 comida", "Desayuno", "Semana"],
    },
    {
      id: 2,
      name: "Menú Mensual Deporte",
      isFavorite: false,
      tags: ["5 comida", "Desayuno", "Semana"],
    },
  ]);

  const [filterOption, setFilterOption] = useState("Creados por mí");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filterOptions = ["Creados por mí", "Compartidos conmigo", "Favoritos"];

  const handleSelectFilter = (option) => {
    setFilterOption(option);
    setShowFilterModal(false);
  };

  const toggleFavorite = (id) => {
    setMenus(
      menus.map((menu) =>
        menu.id === id ? { ...menu, isFavorite: !menu.isFavorite } : menu
      )
    );
  };

  const navigateToCreateMenu = () => {
    navigation.navigate("CreateMenu");
  };

  const navigateToViewMenu = (menu) => {
    navigation.navigate("ViewMenu", { menu });
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
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explorar Menús</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Mis Menús</Text>

        {/* Dropdown Filtro */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterDropdown}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterText}>{filterOption}</Text>
            <Feather name="chevron-down" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Menu Cards */}
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.menuCard}
            onPress={() => navigateToViewMenu(menu)}
          >
            <View style={styles.menuCardHeader}>
              <Text style={styles.menuCardTitle}>{menu.name}</Text>
              <TouchableOpacity onPress={() => toggleFavorite(menu.id)}>
                <FontAwesome
                  name={menu.isFavorite ? "star" : "star-o"}
                  size={24}
                  color={menu.isFavorite ? "#FFD700" : "#AAA"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.tagsContainer}>
              {menu.tags.map((tag, index) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    index === 0 && styles.tagGreen,
                    index === 1 && styles.tagOrange,
                    index === 2 && styles.tagBlue,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      index === 0 && styles.tagTextGreen,
                      index === 1 && styles.tagTextOrange,
                      index === 2 && styles.tagTextBlue,
                    ]}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
              <Feather
                name="arrow-right"
                size={20}
                color="#999"
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={navigateToCreateMenu}>
        <Feather name="plus" size={32} color="#FFF" />
      </TouchableOpacity>

      {/* Modal Filtro */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar menús</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Feather name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  filterOption === option && styles.optionItemSelected,
                ]}
                onPress={() => handleSelectFilter(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    filterOption === option && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {filterOption === option && (
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreButton: {
    backgroundColor: "#5B5FED",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 18,
  },
  filterContainer: {
    marginBottom: 26,
  },
  filterDropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  menuCard: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 16,
    marginBottom: 26,
  },
  menuCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  menuCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
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
    fontWeight: "500",
  },
  tagTextGreen: {
    color: "#4CAF50",
  },
  tagTextOrange: {
    color: "#FF9800",
  },
  tagTextBlue: {
    color: "#2196F3",
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
