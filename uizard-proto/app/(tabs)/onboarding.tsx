import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import GradientBackground from '@/components/gradient-background';
import CustomButton from '@/components/custom-button';
import MembershipCard from '@/components/membership-card';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const handleCardPress = (cardTitle: string) => {
    console.log(`${cardTitle} card pressed`);
    // Burada her kart için farklı işlemler yapılabilir
  };

  // Only Back button will be shown on this screen

  return (
    <GradientBackground>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 12) }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Manage Your Membership Card</Text>
          <Text style={styles.subtitle}>Choose your card features to explore</Text>
        </View>

        {/* Cards Grid */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardRow}>
            <MembershipCard
              title="My Card"
              iconType="creditcard"
              onPress={() => handleCardPress('My Card')}
              style={styles.card}
            />
            <MembershipCard
              title="Level Benefits"
              iconType="chart"
              onPress={() => handleCardPress('Level Benefits')}
              style={styles.card}
            />
          </View>

          <View style={styles.cardRow}>
            <MembershipCard
              title="Available Perks"
              iconType="tag"
              onPress={() => handleCardPress('Available Perks')}
              style={styles.card}
            />
            <MembershipCard
              title="Notifications"
              iconType="gift"
              onPress={() => handleCardPress('Notifications')}
              style={styles.card}
            />
          </View>

          <View style={styles.cardRow}>
            <MembershipCard
              title="Profile"
              iconType="bell"
              onPress={() => handleCardPress('Profile')}
              style={styles.card}
            />
            <MembershipCard
              title="Settings"
              iconType="person"
              onPress={() => handleCardPress('Settings')}
              style={styles.card}
            />
          </View>
        </View>

        {/* Bottom Buttons: Explore + Back */}
        <View style={[styles.buttonContainer]}>
          <CustomButton 
            label="Explore Now" 
            onPress={() => router.push('/(tabs)/home')}
            style={styles.exploreButton}
          />
          <View style={{ height: 14, width: 1 }} />
          <CustomButton 
            label="Back"
            onPress={() => router.back()}
            style={styles.exploreButton}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
   
    
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#dcdcdc',
    textAlign: 'center',
    
    fontFamily: 'System',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 14,
    color: '#dcdcdc',
    textAlign: 'center',
    fontFamily: 'System',
    lineHeight: 18,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5
    ,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    maxWidth: 350,
  },
  card: {
    marginHorizontal: 8,
  },
  buttonContainer: {
   
    alignItems: 'center',
    marginTop: 24,
  },
  exploreButton: {
    width: 198,
    height: 47,
  },
});
