import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    console.log('Get Started pressed');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome!</Text>
          <Button
            title="Login"
            onPress={handleLogin}
            variant="primary"
            size="sm"
          />
        </View>
        <Text style={styles.subtitle}>Your mobile app is ready to use</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Card style={styles.mainCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📱</Text>
          </View>
          <Text style={styles.description}>
            This is your React Native app. You can start building amazing
            features from here.
          </Text>
        </Card>

        {/* Action Button */}
        <View style={styles.actions}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            size="lg"
            style={styles.primaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.gray[100],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.dark,
    flex: 1,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.gray[600],
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  mainCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  icon: {
    fontSize: 48,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.gray[700],
    textAlign: 'center',
  },
  actions: {
    gap: theme.spacing.md,
  },
  primaryButton: {
    marginBottom: theme.spacing.sm,
  },
  secondaryButton: {
    // Additional styles if needed
  },
});

export default WelcomeScreen;
