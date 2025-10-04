import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import GradientBackground from '@/components/gradient-background';
import CustomButton from '@/components/custom-button';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const handleBackPress = () => {
    router.back();
  };

  return (
    <GradientBackground>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 12) }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>
              Welcome to the Royans Card app!{'\n'}
              This is a demo version with interactive navigation.
            </Text>
            
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Features:</Text>
              <Text style={styles.featureItem}>• Animated falling coins</Text>
              <Text style={styles.featureItem}>• Gradient background</Text>
              <Text style={styles.featureItem}>• Custom button styling</Text>
              <Text style={styles.featureItem}>• Smooth navigation</Text>
              <Text style={styles.featureItem}>• Cross-platform support</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <CustomButton 
              label="Go Back" 
              onPress={handleBackPress}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 72,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
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
    marginBottom: 40,
    fontFamily: 'System',
  },
  featuresContainer: {
    alignItems: 'flex-start',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    fontFamily: 'System',
  },
  featureItem: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
    fontFamily: 'System',
  },
  buttonContainer: {
    paddingBottom: 0,
    alignItems: 'center',
    marginTop: 24,
  },
});
