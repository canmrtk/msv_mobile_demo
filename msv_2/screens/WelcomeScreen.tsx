import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, LayoutChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const [overlayHeight, setOverlayHeight] = useState<number>(Math.round(height * 0.4));

  const handleNumbersLayout = useCallback((e: LayoutChangeEvent) => {
    const { y, height: h } = e.nativeEvent.layout; // y is relative to header
    const headerTop = Math.round(height * 0.15); // match headerArea paddingTop (25%)
    const absBottom = headerTop + Math.round(y + h) + 15; // 15px under Numbers
    const clamped = Math.min(height, Math.max(0, absBottom));
    setOverlayHeight(clamped);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Base background (Background@2x) fills the whole screen */}
      <Image source={require('../assets/images/Background2x.png')} style={styles.baseBg} resizeMode="cover" />

      {/* Overlay (Background 2@2x) from top to just under Numbers */}
      <Image
        source={require('../assets/images/Background2_2x.png')}
        style={[styles.overlayTop, { height: overlayHeight }]} // starts at top:0
        resizeMode="cover"
      />

      {/* No large bottom shape; shapes are used only for button backgrounds */}

      {/* Top content */}
      <View style={styles.headerArea}>
        <Image source={require('../assets/images/Welcome2x.png')} style={styles.welcomeImg} resizeMode="contain" />
        <Image source={require('../assets/images/Logo2x.png')} style={styles.logoImg} resizeMode="contain" />
        <Image
          source={require('../assets/images/Numbers2x.png')}
          style={styles.numbersImg}
          resizeMode="contain"
          onLayout={handleNumbersLayout}
        />
      </View>

      {/* Lower content on Shape */}
      <View style={styles.lowerArea}>
        <Image source={require('../assets/images/SignSentence2x.png')} style={styles.signSentenceImg} resizeMode="contain" />

        {/* Log in button with Shape background */}
        <View style={styles.btnWrap}>
          <Image source={require('../assets/images/Shape2x.png')} style={styles.shapeButton} resizeMode="stretch" />
          <TouchableOpacity style={styles.buttonTouch} onPress={() => navigation.navigate('Home' as never)}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>

        {/* Google button with Shape background */}
        <View style={styles.btnWrap}>
          <Image source={require('../assets/images/Shape2x.png')} style={styles.shapeButton} resizeMode="stretch" />
          <TouchableOpacity style={[styles.buttonTouch, styles.googleRow]} onPress={() => navigation.navigate('Home' as never)}>
            <Image source={require('../assets/images/GoogleLogo2x.png')} style={styles.googleLogoImg} resizeMode="contain" />
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  baseBg: { position: 'absolute', top: 0, left: 0, width: width, height: height, zIndex: 1 },
  overlayTop: { position: 'absolute', top: 0, left: 0, width: width, zIndex: 2, },
  headerArea: { zIndex: 3, alignItems: 'center', paddingTop: Math.round(height * 0.143), },
  welcomeImg: { width: Math.round(width * 0.54), height: undefined, aspectRatio: 5.7, marginBottom: Math.round(height * 0.005), marginTop: Math.round(width * 0.0005) },
  logoImg: { width: Math.round(width * 0.36), height: undefined, aspectRatio: 1, marginBottom: Math.round(height * 0.03), marginTop: Math.round(height * 0.05) },
  numbersImg: { width: Math.round(width * 0.62), height: undefined, aspectRatio: 5.3 },
  lowerArea: { position: 'absolute', zIndex: 3, bottom: Math.round(height * 0.095), width: width, alignItems: 'center', paddingHorizontal: 24 },
  signSentenceImg: { width: Math.round(width * 0.8), height: undefined, aspectRatio: 6.2, marginBottom: 18 },

  btnWrap: { position: 'relative', alignItems: 'center', marginBottom: 14, width: Math.round(width * 0.6), height: Math.round(height * 0.07) },
  shapeButton: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  buttonTouch: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },

  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  googleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  googleLogoImg: { width: 22, height: 22, marginRight: 10 },
  googleText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
});
