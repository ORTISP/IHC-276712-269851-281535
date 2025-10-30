import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import authStorage from "../services/authStorage";

export default function MainMenu() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    const unsubscribe = navigation.addListener("focus", checkAuthStatus);
    return unsubscribe;
  }, [navigation]);

  const checkAuthStatus = async () => {
    const loggedIn = await authStorage.isLoggedIn();
    setIsLoggedIn(loggedIn);
  };

  const handlePress = (option) => {
    console.log(`Pressed: ${option}`);
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleUserButton = () => {
    navigation.navigate("Perfil");
  };

  const handleExistingLists = () => {
    handlePress("Abrir lista existente");
  };

  const handleInventory = () => {
    handlePress("Inventario");
  };

  const handleCreateList = () => {
    handlePress("Crear lista")
  };

  const handleRecipes = () => {
    handlePress("Recetas");
  };

  const handleMenus = () => {
    navigation.navigate("Menus");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* Fila superior: imagen + botón login/usuario */}
        <View style={styles.headerTop}>
          <Image
            source={{ uri: "https://via.placeholder.com/60" }}
            style={styles.profileImage}
          />

          {isLoggedIn ? (
            <TouchableOpacity
              onPress={handleUserButton}
              style={styles.userButton}
              activeOpacity={0.7}
            >
              <View style={styles.userIconContainer}>
                <Text style={styles.userIcon}>👤</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Título centrado más abajo */}
        <Text style={styles.title}>ComiditApp</Text>
      </View>

      {/* MENÚ PRINCIPAL */}
      <View style={styles.menuContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOrange]}
            onPress={handleExistingLists}
          >
            <Feather name="shopping-bag" size={40} color="#D97706" />
            <Text style={[styles.buttonText, styles.textOrange]}>
              Abrir lista{"\n"}existente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonCoral]}
            onPress={handleInventory}
          >
            <Feather name="package" size={40} color="#DC2626" />
            <Text style={[styles.buttonText, styles.textCoral]}>
              Inventario
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.buttonGreen]}
            onPress={handleCreateList}
          >
            <Feather name="plus" size={40} color="#FFFFFF" />
            <Text style={[styles.buttonText, styles.textWhite]}>
              Crear lista
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={handleRecipes}
          >
            <Feather name="file-text" size={40} color="#0EA5E9" />
            <Text style={[styles.buttonText, styles.textBlue]}>Recetas</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.buttonWide, styles.buttonPink]}
          onPress={handleMenus}
        >
          <Feather name="map" size={40} color="#A855F7" />
          <Text style={[styles.buttonText, styles.textPurple]}>Menús</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1E40AF",
    textAlign: "center",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  loginText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  userButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E40AF",
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    gap: 8,
  },
  buttonWide: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    gap: 8,
  },
  buttonOrange: {
    backgroundColor: "#FEF3C7",
    borderColor: "#D97706",
  },
  buttonCoral: {
    backgroundColor: "#FEE2E2",
    borderColor: "#DC2626",
  },
  buttonGreen: {
    backgroundColor: "#10B981",
    borderColor: "#059669",
  },
  buttonBlue: {
    backgroundColor: "#E0F2FE",
    borderColor: "#0EA5E9",
  },
  buttonPink: {
    backgroundColor: "#FAE8FF",
    borderColor: "#A855F7",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  textOrange: {
    color: "#D97706",
  },
  textCoral: {
    color: "#DC2626",
  },
  textWhite: {
    color: "#FFFFFF",
  },
  textBlue: {
    color: "#0EA5E9",
  },
  textPurple: {
    color: "#A855F7",
  },
});
