import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientBackground from '@/components/gradient-background';
import { HamburgerIcon, QrIcon, PlusIcon, StarIcon, CheckIcon, GiftIcon, PersonIcon, HomeIcon, SearchIcon, ChatIcon } from '@/components/svg-icons';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <GradientBackground>
      <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 12) }] }>
        {/* HEADER (fixed 330px) */}
        <View style={styles.headerArea}>
          <Text style={styles.faintTitle}>Royans Card</Text>
          <View style={styles.hamburgerWrapper}>
            <HamburgerIcon size={24} color="#ffffff" />
          </View>
          <View style={styles.centerBlock}>
            <QrIcon size={72} color="#ffffff" />
            <Text style={styles.timeText}>12:45</Text>
            <Text style={styles.expText}>Exp. 12/2024</Text>
          </View>
        </View>

        {/* raised panel starting after header */}
        <View style={styles.panel}>
          <View style={styles.tilesRow}>
            <View style={styles.tile}>
              <StarIcon size={28} />
              <Text style={styles.tileTextSmall}>Level</Text>
              <Text style={styles.tileTextStrong}>Benefits</Text>
            </View>
            <View style={styles.tile}>
              <GiftIcon size={28} />
              <Text style={styles.tileTextSmall}>Available</Text>
              <Text style={styles.tileTextStrong}>Perks</Text>
            </View>
          </View>
          <View style={styles.tilesRow}>
            <View style={styles.tile}>
              <StarIcon size={28} />
              <Text style={styles.tileTextSmall}>Redeem</Text>
              <Text style={styles.tileTextStrong}>Perks</Text>
            </View>
            <View style={styles.tile}>
              <CheckIcon size={28} />
              <Text style={styles.tileTextSmall}>Member</Text>
              <Text style={styles.tileTextStrong}>Number</Text>
            </View>
          </View>
        </View>

        {/* footer bar */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 0) }]}>
          <View style={styles.footerRow}>
            <HomeIcon />
            <SearchIcon />
            <View style={styles.fabHole} />
            <ChatIcon />
            <PersonIcon size={22} color={'#128872'} />
          </View>
        </View>

        {/* floating action */}
        <View style={styles.fab}>
          <PlusIcon size={28} color="#ffffff" />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  faintTitle: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 5,
    lineHeight: 26,
    opacity: 0.05,
  },
  hamburgerWrapper: {
    position: 'absolute',
    top: -30,
    right: 24,
  },
  headerArea: {
    height: 300,
    justifyContent: 'flex-start',
  },
  centerBlock: {
    marginTop: 20,
    alignItems: 'center',
  },
  timeText: {
    color: '#ffffff',
    fontSize: 66,
    fontWeight: '500',
    lineHeight: 80,
    textAlign: 'center',
    marginTop: 16,
  },
  expText: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 8,
  },
  panel: {
    flexGrow: 1,
    marginTop: -50,
    backgroundColor: '#128872',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 52,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.53,
    shadowRadius: 8,
    shadowOffset: { width: -3, height: -4 },
  },
  tilesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  tile: {
    width: 148,
    height: 148,
    backgroundColor: '#65aaa2',
    borderRadius: 16,
    opacity: 0.35,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileTitle: {
    color: '#ffffff',
    textAlign: 'center',
  },
  tileTextSmall: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.95,
    marginTop: 10,
    textAlign: 'center',
  },
  tileTextStrong: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 112,
    backgroundColor: '#ffffff',
    shadowColor: '#030303',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
  },
  footerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
  },
  fabHole: {
    width: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 34,
    alignSelf: 'center',
    width: 76,
    height: 76,
    borderRadius: 100,
    backgroundColor: '#128872',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.52,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -7 },
  },
});


