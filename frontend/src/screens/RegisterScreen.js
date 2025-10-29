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
      showToast('Por favor complete todos los campos');
      return;
    }

    // Basic email validation in frontend
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!emailRegex.test(trimmedEmail)) {
      showToast('Por favor ingrese un correo electrónico válido');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      showToast('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      // Only send email and password - other fields will be added later
      const registrationData = {
        email: trimmedEmail,
        password,
      };

      const response = await AuthService.register(registrationData);

      if (response.success) {
        showToast('¡Cuenta creada exitosamente!', 'success');

        // Clear form
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // Navigate to form screen with user ID after a short delay
        setTimeout(() => {
          navigation.navigate('Form', {
            userId: response.data?.user?.id,
          });
        }, 2000);
      } else {
        showToast(response.error || 'Error al registrar');
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Handle validation errors with specific messages
      if (error.details && Array.isArray(error.details) && error.details.length > 0) {
        // Show the first validation error message
        showToast(error.details[0]);
      } else if (error.message.includes('Validation failed')) {
        showToast('Por favor verifique los datos ingresados');
      } else if (error.message.includes('Password is too weak')) {
        showToast('La contraseña es demasiado débil. Por favor use una contraseña más fuerte');
      } else if (error.message.includes('already exists') || error.message.includes('duplicate')) {
        showToast('Ya existe una cuenta con este correo electrónico');
      } else {
        showToast(error.message || 'Error al registrar. Por favor intente nuevamente');
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
            title="← Atrás"
            onPress={handleBackToLogin}
            variant="secondary"
            size="sm"
            style={styles.backButton}
          />
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para una nueva cuenta</Text>
        </View>

        {/* Registration Form */}
        <Card style={styles.form}>
          <Input
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Button
            title={isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
            onPress={handleRegister}
            variant="primary"
            size="lg"
            style={styles.registerButton}
            disabled={isLoading}
          />

          <Button
            title="¿Ya tienes una cuenta? Inicia sesión"
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
