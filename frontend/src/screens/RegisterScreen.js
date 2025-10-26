import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import Card from '../components/shared/Card';
import Toast from '../components/shared/Toast';
import AuthService from '../services/authService';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('error');
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, type = 'error') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      showToast('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Only send email and password - other fields will be added later
      const registrationData = {
        email: email.trim().toLowerCase(),
        password,
      };

      const response = await AuthService.register(registrationData);

      if (response.success) {
        showToast('Account created successfully!', 'success');

        // Clear form
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Navigate to login screen after a short delay
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      } else {
        showToast(response.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (error.message.includes('Validation failed')) {
        showToast('Please check your email format');
      } else if (error.message.includes('Password is too weak')) {
        showToast('Password is too weak. Please use a stronger password');
      } else if (error.message.includes('already exists')) {
        showToast('An account with this email already exists');
      } else {
        showToast('Registration failed. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Button
            title="← Back"
            onPress={handleBackToLogin}
            variant="secondary"
            size="sm"
            style={styles.backButton}
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up for a new account</Text>
        </View>

        {/* Registration Form */}
        <Card style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Button
            title={isLoading ? 'Creating Account...' : 'Create Account'}
            onPress={handleRegister}
            variant="primary"
            size="lg"
            style={styles.registerButton}
            disabled={isLoading}
          />

          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate('Login')}
            variant="secondary"
            size="md"
            style={styles.loginButton}
          />
        </Card>
      </View>

      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        onHide={hideToast}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.dark,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.gray[600],
  },
  form: {
    flex: 1,
  },
  registerButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  loginButton: {
    marginBottom: theme.spacing.sm,
  },
});

export default RegisterScreen;
