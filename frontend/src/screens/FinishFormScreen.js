import React from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

const FinishFormScreen = ({ navigation }) => {
  const handleNavigateToWelcome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView 
      className="flex-1 bg-white"
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        {/* Text centered above button */}
        <Text
          style={{
            fontSize: 36,
            fontWeight: '700',
            color: '#111827',
            marginBottom: 48,
            textAlign: 'center',
          }}
        >
          ¡Todo pronto!
        </Text>

        {/* Navigate Arrow */}
        <TouchableOpacity
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#3b82f6',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={handleNavigateToWelcome}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontSize: 32,
              color: '#ffffff',
              fontWeight: '700',
            }}
          >
            →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FinishFormScreen;

