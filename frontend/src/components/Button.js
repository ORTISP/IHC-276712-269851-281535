import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme, createButtonStyle, createTextStyle } from '../styles/theme';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  style,
  textStyle,
  ...props 
}) => {
  const buttonStyle = [
    createButtonStyle(variant, size),
    disabled && styles.disabled,
    style,
  ];

  const textColor = variant === 'primary' ? 'white' : 'primary';
  const textStyleCombined = [
    createTextStyle('body'),
    { color: variant === 'primary' ? theme.colors.white : theme.colors.primary },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
