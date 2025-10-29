import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../../styles/theme';

const Toast = ({
  visible,
  message,
  type = 'error',
  duration = 3000,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) onHide();
    });
  };

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, duration]);

  if (!visible) {
    return null;
  }

  const getToastStyle = () => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: theme.colors.error || '#FF4444',
          borderLeftColor: '#CC0000',
        };
      case 'success':
        return {
          backgroundColor: theme.colors.success || '#00C851',
          borderLeftColor: '#00A041',
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning || '#FF8800',
          borderLeftColor: '#CC6600',
        };
      case 'info':
        return {
          backgroundColor: theme.colors.info || '#33B5E5',
          borderLeftColor: '#0099CC',
        };
      default:
        return {
          backgroundColor: theme.colors.error || '#FF4444',
          borderLeftColor: '#CC0000',
        };
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={[styles.toast, getToastStyle()]}>
        <View style={styles.content}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: theme.spacing.md,
    right: theme.spacing.md,
    zIndex: 1000,
  },
  toast: {
    borderRadius: theme.borderRadius.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: theme.spacing.md,
  },
  message: {
    ...theme.typography.body,
    color: theme.colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Toast;
