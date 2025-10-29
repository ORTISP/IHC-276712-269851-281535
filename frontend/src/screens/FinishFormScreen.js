import React from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

const FinishFormScreen = ({ navigation }) => {
  const handleNavigateToWelcome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View
        className="flex-1 justify-center items-center px-6"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        <Text
          className="text-4xl font-bold text-gray-900 mb-8"
          style={{
            fontSize: 36,
            fontWeight: '700',
            color: '#111827',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          ¡Todo pronto!
        </Text>

        {/* Navigate Arrow */}
        <View
          className="items-center mt-8"
          style={{
            alignItems: 'center',
            marginTop: 32,
          }}
        >
          <TouchableOpacity
            className="w-14 h-14 rounded-full bg-blue-500 justify-center items-center shadow-md"
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
              className="text-3xl text-white font-bold"
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
      </View>
    </SafeAreaView>
  );
};

export default FinishFormScreen;

