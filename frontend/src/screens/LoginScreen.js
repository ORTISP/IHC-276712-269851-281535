import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import { theme } from '../styles/theme';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // TODO: Implement actual login logic with backend
    console.log('Login attempt:', { email, password });
    Alert.alert('Success', 'Login functionality will be implemented with backend');
  };

  const handleBackToWelcome = () => {
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
            onPress={handleBackToWelcome}
            variant="secondary"
            size="sm"
            style={styles.backButton}
          />
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {/* Login Form */}
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

          <Button 
            title="Login" 
            onPress={handleLogin}
            variant="primary"
            size="lg"
            style={styles.loginButton}
          />

          <Button 
            title="Create Account" 
            onPress={() => Alert.alert('Info', 'Registration functionality will be implemented')}
            variant="secondary"
            size="md"
            style={styles.registerButton}
          />

          <Button 
            title="Forgot Password?" 
            onPress={() => Alert.alert('Info', 'Forgot password functionality will be implemented')}
            variant="secondary"
            size="sm"
            style={styles.forgotPassword}
          />
        </Card>
      </View>
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
  loginButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  registerButton: {
    marginBottom: theme.spacing.sm,
  },
  forgotPassword: {
    alignSelf: 'center',
  },
});

export default LoginScreen;
