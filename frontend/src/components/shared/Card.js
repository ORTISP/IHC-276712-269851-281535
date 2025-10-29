import React from 'react';
import { View } from 'react-native';

const Card = ({ children, className, style, ...props }) => {
  return (
    <View
      className={`bg-white rounded-xl p-6 shadow-md ${className || ''}`}
      style={[
        {
          backgroundColor: '#ffffff',
          borderRadius: 12,
          padding: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default Card;
