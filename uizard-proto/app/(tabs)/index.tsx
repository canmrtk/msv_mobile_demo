import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import GradientBackground from '@/components/gradient-background';
import CustomButton from '@/components/custom-button';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleExplorePress = () => {
    router.push('/(tabs)/onboarding');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Royans Card</Text>
          
          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Easily manage your{'\n'}membership benefits
          </Text>
        </View>
        
        {/* Button */}
        <View style={styles.buttonContainer}>
          <CustomButton 
            label="Explore now" 
            onPress={handleExplorePress}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'System',
    opacity: 0.9,
  },
  buttonContainer: {
    paddingBottom: 60,
    alignItems: 'center',
  },
});
