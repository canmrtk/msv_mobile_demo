import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// SVG imports
import ProfileSvg from '../assets/svg/Profile Card.svg';

const { width, height } = Dimensions.get('window');

// PNG imports
const BACK_ICON = require('../assets/images/Back_icon.png');
const LOGO_DARK = require('../assets/images/LogoDark.png');
const KEBAB_BAR = require('../assets/images/KebabBar2x.png');
const BACKGROUND_4 = require('../assets/images/Background4.png');
const BACKGROUND_3 = require('../assets/images/Background3_2x.png');
const PROFIL_PHOTO = require('../assets/images/ProfilePhoto.png');
const DARK_BAR = require('../assets/images/DarkBar.png');
const SILVER_ICON = require('../assets/images/SilverIcon.png');
const LONG_BAR = require('../assets/images/LongBar.png');
const BAR = require('../assets/images/Bar.png');
const MENU_RED = require('../assets/images/MenuRed.png');
const LOGOUT_PNG = require('../assets/images/LogOut.png');

const MENU_W = Math.round(width * 0.75);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuProg = useRef(new Animated.Value(0)).current;

  const menuItems = [
    { key: 'profile', label: 'Profile' },
    { key: 'settings', label: 'Settings' },
    { key: 'opportunities', label: 'Opportunities' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'support', label: 'Support' },
  ];

  const toggleMenu = () => {
    const toValue = menuVisible ? 0 : 1;
    setMenuVisible(!menuVisible);
    Animated.timing(menuProg, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onMenuItemPress = (key: string) => {
    console.log('Menu item pressed:', key);
    if (key === 'profile') {
      // Already on profile screen
      toggleMenu();
      return;
    }
    // Handle other menu items
    toggleMenu();
  };

  const onLogout = () => {
    console.log('Logout pressed');
    toggleMenu();
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      if (menuVisible) {
        const touchX = evt.nativeEvent.pageX;
        if (touchX < width - MENU_W) {
          toggleMenu();
        }
      }
    },
  });

  // Animation values
  const menuWidth = menuProg.interpolate({ inputRange: [0, 1], outputRange: [0, MENU_W] });
  const menuRadius = menuWidth;
  const itemsOpacity = menuProg.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 0, 1] });
  const sceneOpacity = menuProg.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Main background */}
      <Image source={BACKGROUND_3} style={styles.mainBg} />

      {/* Main content */}
      <Animated.View style={[styles.scene, { opacity: sceneOpacity }]}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
              <Image source={BACK_ICON} style={styles.backIcon} />
            </TouchableOpacity>
            
            <Image source={LOGO_DARK} style={styles.logoDark} />
            
            <TouchableOpacity onPress={toggleMenu} style={styles.kebabBtn}>
              <Image source={KEBAB_BAR} style={styles.kebabIcon} />
            </TouchableOpacity>
          </View>

          {/* Top background with profile section */}
          <View style={styles.topSection}>
            <Image source={BACKGROUND_4} style={styles.topBg} />
            
            {/* Member Username */}
            <Text style={styles.memberUsername}>Member Username</Text>
            
            {/* Profile Photo */}
            <View style={styles.profilePhotoContainer}>
              <Image source={PROFIL_PHOTO} style={styles.profilePhoto} />
            </View>
          </View>

          {/* Level Bar */}
          <View style={styles.levelSection}>
            <Image source={DARK_BAR} style={styles.levelBar} />
            <View style={styles.levelContent}>
              <Text style={styles.levelText}>Level</Text>
              <View style={styles.silverContainer}>
                <Text style={styles.silverText}>Silver</Text>
                <Image source={SILVER_ICON} style={styles.silverIcon} />
              </View>
            </View>
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Progress</Text>
            
            {/* Points bar */}
            <View style={styles.progressItem}>
              <Image source={LONG_BAR} style={styles.longBar} />
              <View style={styles.progressContent}>
                <Text style={styles.progressLabel}>Points</Text>
                <Text style={styles.progressValue}>197866XP</Text>
                <TouchableOpacity style={styles.arrowBtn}>
                  <Image source={BACK_ICON} style={[styles.arrowIcon, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Achievements bar */}
            <View style={styles.progressItem}>
              <Image source={BAR} style={styles.shortBar} />
              <View style={styles.progressContent}>
                <Text style={styles.progressLabel}>Achievements</Text>
                <TouchableOpacity style={styles.arrowBtn}>
                  <Image source={BACK_ICON} style={[styles.arrowIcon, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* My Events bar */}
            <View style={styles.progressItem}>
              <Image source={BAR} style={styles.shortBar} />
              <View style={styles.progressContent}>
                <Text style={styles.progressLabel}>My Events</Text>
                <TouchableOpacity style={styles.arrowBtn}>
                  <Image source={BACK_ICON} style={[styles.arrowIcon, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Bottom right corner - Profile indicator */}
      <View style={styles.bottomCorner}>
        <Image source={MENU_RED} style={styles.menuRedBg} />
        <ProfileSvg width={40} height={40} style={styles.profileSvg} />
      </View>

      {/* Menu Panel */}
      <Animated.View
        style={[
          styles.menuPanel,
          { width: menuWidth, height, borderTopLeftRadius: menuRadius as any, borderBottomLeftRadius: menuRadius as any },
        ]}
      >
        <LinearGradient
          colors={[ '#E3E3E3', '#A7A9AC', '#707274' ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View style={[styles.menuInner, { opacity: itemsOpacity }]}>
          <View style={{ gap: 18, marginTop: 80, width: '100%', alignItems: 'flex-end', paddingRight: 24 }}>
            {menuItems.map((m, idx) => (
              <Pressable key={m.key} onPress={() => onMenuItemPress(m.key)} style={styles.menuItem}>
                <Text style={styles.menuText}>{m.label}</Text>
                {idx !== menuItems.length - 1 && <View style={styles.menuDivider} />}
              </Pressable>
            ))}
          </View>

          <Pressable onPress={onLogout} style={styles.logoutBtn}>
            <Image source={LOGOUT_PNG} style={{ width: 28, height: 28 }} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  mainBg: { position: 'absolute', width, height, resizeMode: 'cover' },
  scene: { flex: 1 },
  safeArea: { flex: 1 },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 60,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  logoDark: { width: 40, height: 40, resizeMode: 'contain' },
  kebabBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  kebabIcon: { width: 24, height: 24, resizeMode: 'contain' },

  // Top section
  topSection: {
    position: 'relative',
    height: Math.round(height * 0.35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBg: {
    position: 'absolute',
    width,
    height: '100%',
    resizeMode: 'cover',
    top: -20,
  },
  memberUsername: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 30,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  // Level section
  levelSection: {
    position: 'relative',
    marginHorizontal: 20,
    marginTop: 20,
    height: 50,
    justifyContent: 'center',
  },
  levelBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  levelContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  silverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  silverText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  silverIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  // Progress section
  progressSection: {
    marginHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  progressTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressItem: {
    position: 'relative',
    height: 60,
    marginBottom: 15,
    justifyContent: 'center',
  },
  longBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  shortBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginRight: 10,
  },
  arrowBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },

  // Bottom corner
  bottomCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRedBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileSvg: {
    marginTop: -10,
    marginRight: -10,
  },

  // Menu
  menuPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  menuInner: { flex: 1, paddingRight: 20, paddingLeft: 24, alignItems: 'flex-end' },
  menuItem: { width: '100%' },
  menuText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'right', paddingVertical: 6, paddingRight: 24 },
  menuDivider: { alignSelf: 'flex-end', width: 120, height: 2, backgroundColor: '#D6D9DD', marginTop: 6, borderRadius: 2, marginRight: 24 },
  logoutBtn: { position: 'absolute', right: 28, bottom: 36, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
});

export default ProfileScreen;
