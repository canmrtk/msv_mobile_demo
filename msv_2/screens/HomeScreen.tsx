// HomeScreen.tsx
import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Pressable,
  Image,
  Text,
  Animated,
  Easing,
  GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import EventsCard from '../assets/svg/Events Card.svg';
import NotificationCard from '../assets/svg/Notification Card.svg';
import MemberCard from '../assets/svg/Member Card Card.svg';
import ProfileCard from '../assets/svg/Profile Card.svg';
import HomeCard from '../assets/svg/Home Card.svg';

// PNG slotları — kendi path’lerinle değiştir
const BG_RIGHT_PANEL = require('../assets/images/Background3_2x.png');   // sağdaki beyaz panel
const LOGO_TOP_LEFT   = require('../assets/images/Logo2x.png');        // sol üst logo
const KEBAB_TOP_RIGHT = require('../assets/images/KebabBar2x.png');  
const LOGOUT_PNG      = require('../assets/images/LogOut.png');
// const MENU_BG_PNG     = require('../assets/images/kebabMenuBackground.png'); // artık kullanılmıyor

const { width, height } = Dimensions.get('window');

type CardDef = { key: string; label: string; Component: React.FC<any> };

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  // sıra: events → notification → member → profile → home
  const cards: CardDef[] = useMemo(
    () => [
      { key: 'events',       label: 'Events',        Component: EventsCard },
      { key: 'notification', label: 'Notifications', Component: NotificationCard },
      { key: 'member',       label: 'Members',       Component: MemberCard },
      { key: 'profile',      label: 'Profile',       Component: ProfileCard },
      { key: 'home',         label: 'Home',          Component: HomeCard },
    ],
    []
  );

  // —— Kart fan yerleşimi (sağa sabit) ——
  const PANEL_RIGHT_PADDING = 10;
  const ANCHOR_TOP = Math.max(60, height * 0.16);
  const CARD_W = Math.min(width * 0.68, 300);
  const CARD_H = Math.min(height * 0.56, 560);
  const FAN_ROTATIONS = [-18, -9, 0, 9, 18];
  const FAN_Y_OFFSETS = [-28, -14, 0, 16, 32];

  // —— Kart seçim davranışı (wrap + basılı tutarken adım adım + hız limiti) ——
  const N = cards.length;
  const wrap = (i: number) => (i % N + N) % N;

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  useEffect(() => { indexRef.current = index; }, [index]);

  const [menuOpen, setMenuOpen] = useState(false);

  const STEP = 36;         // bir adım için sürükleme mesafesi
  const MAX_RATE_MS = 140; // iki adım arası min süre

  const lastCommittedDyRef = useRef(0);
  const lastTickRef = useRef(0);

  const stepNext = () => setIndex(prev => wrap(prev + 1));
  const stepPrev = () => setIndex(prev => wrap(prev - 1));

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dy) > 6,
      onPanResponderGrant: () => {
        lastCommittedDyRef.current = 0;
        lastTickRef.current = Date.now() - MAX_RATE_MS;
      },
      onPanResponderMove: (_e, g) => {
        const now = Date.now();
        if (now - lastTickRef.current < MAX_RATE_MS) return;
        const deltaFromLast = g.dy - lastCommittedDyRef.current;
        if (deltaFromLast <= -STEP) {
          stepNext();
          lastCommittedDyRef.current -= STEP;
          lastTickRef.current = now;
        } else if (deltaFromLast >= STEP) {
          stepPrev();
          lastCommittedDyRef.current += STEP;
          lastTickRef.current = now;
        }
      },
      onPanResponderRelease: () => {
        lastCommittedDyRef.current = 0;
        lastTickRef.current = 0;
      },
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  // —— SAĞ MENÜ (kebab) overlay animasyonu ——
  const MENU_W = Math.max(0.7 * width, 220); // panel hedef genişliği
  const menuProg = useRef(new Animated.Value(0)).current; // 0 kapalı, 1 açık
  const isMenuOpenRef = useRef(false);

  const openMenu = () => {
    setMenuOpen(true);
    isMenuOpenRef.current = true;
    Animated.timing(menuProg, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // width/radius animasyonu için false
    }).start();
  };
  const closeMenu = (toHome: boolean) => {
    Animated.timing(menuProg, {
      toValue: 0,
      duration: 280,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      isMenuOpenRef.current = false;
      setMenuOpen(false);
      if (toHome) {
        // navigation.navigate('Home');
        console.log('Go to: Home');
      }
    });
  };

  // Menü genişlik & radius & içerik opaklığı
  const menuWidth = menuProg.interpolate({ inputRange: [0, 1], outputRange: [0, MENU_W] });
  const menuRadius = menuWidth; // tam kavisli kenar
  const itemsOpacity = menuProg.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 0, 1] });
  // ölçek animasyonu kaldırıldı; içerik kaymasını önlemek için sadece opacity kullanıyoruz

  // Dış (beyaz) bölge: soldaki genişlik
  const outsideWidth = menuProg.interpolate({ inputRange: [0, 1], outputRange: [width, width - MENU_W] });

  // Kebab ikonu, panel açılırken sola kayar
  const kebabTx = menuProg.interpolate({ inputRange: [0, 1], outputRange: [0, -MENU_W + 16] });

  // MENÜ AÇIKKEN sahnenin geri kalanını sakla
  const stageOpacity = menuProg.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  // Menü öğeleri
  const menuItems = [
    { key: 'profile',       label: 'Profile' },
    { key: 'settings',      label: 'Settings' },
    { key: 'opportunities', label: 'Opportunities' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'support',       label: 'Support' },
  ];

  const onMenuItemPress = (k: string) => {
    console.log('Menu item:', k);
    if (k === 'profile') {
      navigation.navigate('Profile');
    }
    // navigation.navigate(<route>);
    closeMenu(false);
  };
  const onLogout = () => {
    // navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
    console.log('Logout → Welcome');
    closeMenu(false);
  };

  // Beyaz alana tıklama (Home'a dön + kapan)
  const onPressOutside = (_e: GestureResponderEvent) => {
    // gri olmayan alana tıklayınca menüyü kapat
    closeMenu(false);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Statik üst görseller */}
      <Animated.View style={[styles.headerRow, { opacity: stageOpacity }]}>
        <Image source={LOGO_TOP_LEFT} style={styles.headerLogo} resizeMode="contain" />
        <Animated.View style={{ transform: [{ translateX: kebabTx }] }}>
          <Pressable onPress={openMenu} hitSlop={10}>
            <Image source={KEBAB_TOP_RIGHT} style={styles.headerKebab} resizeMode="contain" />
          </Pressable>
        </Animated.View>
      </Animated.View>
      {/* opsiyonel sağ panel bg */}
      <Animated.Image source={BG_RIGHT_PANEL} style={[styles.rightPanel, { opacity: stageOpacity }]} resizeMode="stretch" />

      {/* KART SAHNESİ (sağa sabit fan) */}
      <Animated.View style={[styles.stage, { opacity: stageOpacity }]} {...pan.panHandlers}>
        {cards.map((c, i) => {
          const CardComp = c.Component;
          const isActive = i === index;
          return (
            <View
              key={c.key}
              style={[
                styles.card,
                {
                  width: CARD_W,
                  height: CARD_H,
                  right: PANEL_RIGHT_PADDING,
                  top: ANCHOR_TOP + FAN_Y_OFFSETS[i],
                  transform: [{ rotate: `${FAN_ROTATIONS[i]}deg` }],
                  zIndex: isActive ? 100 : 10 + i,
                  opacity: isActive ? 1 : 0,
                  shadowOpacity: isActive ? 0.18 : 0,
                  elevation: isActive ? 7 : 0,
                },
              ]}
              pointerEvents={isActive ? 'auto' : 'none'}
            >
              <CardComp width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
            </View>
          );
        })}

        {/* Aktif kart etiketi (opsiyonel) */}
        <View
          pointerEvents="none"
          style={[
            styles.labelChip,
            { right: PANEL_RIGHT_PADDING + CARD_W - 90, top: ANCHOR_TOP - 24 },
          ]}
        >
          <Text style={styles.labelText}>{cards[index].label}</Text>
        </View>

        {/* Orta 1/3 tek dokunuş → git */}
        <View
          pointerEvents="box-none"
          style={{ position: 'absolute', right: PANEL_RIGHT_PADDING, top: ANCHOR_TOP, width: CARD_W, height: CARD_H }}
        >
          <Pressable
            style={{ position: 'absolute', left: 0, right: 0, top: CARD_H / 3, height: CARD_H / 3 }}
            onPress={() => {
              const key = cards[index].key;
              if (key === 'profile') {
                navigation.navigate('Profile');
              } else {
                const routeMap: Record<string, string> = {
                  events: 'Events', notification: 'Notifications', member: 'Members', home: 'Home',
                };
                const r = routeMap[key];
                if (r) console.log('Go to:', r);
              }
            }}
          />
        </View>
      </Animated.View>

      {/* ====== SAĞ MENÜ OVERLAY ====== */}
      <Animated.View pointerEvents={menuOpen ? 'auto' : 'none'} style={[styles.overlayRow]}>
        {/* Soldaki alan — transparan ve tıklayınca kapanır */}
        <Animated.View style={[styles.outsideTouchable, { width: outsideWidth, height, backgroundColor: 'transparent' }]}>
          <Pressable style={{ flex: 1 }} onPress={onPressOutside} />
        </Animated.View>

        {/* Sağdaki panel: transparan zemin, içeride gradient */}
        <Animated.View
          style={[
            styles.menuPanel,
            { width: menuWidth, height, borderTopLeftRadius: menuRadius as any, borderBottomLeftRadius: menuRadius as any },
          ]}
        >
          {/* Daha belirgin gri geçiş - sola açık, sağa koyu */}
          <LinearGradient
            colors={[ '#E3E3E3', '#A7A9AC', '#707274' ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Menü içerikleri (fade-in) */}
          <Animated.View style={[styles.menuInner, { opacity: itemsOpacity }]}>
            <View style={{ gap: 18, marginTop: 80, width: '100%', alignItems: 'flex-end', paddingRight: 24 }}>
              {menuItems.map((m, idx) => (
                <Pressable key={m.key} onPress={() => onMenuItemPress(m.key)} style={styles.menuItem}>
                  <Text style={styles.menuText}>{m.label}</Text>
                  {idx !== menuItems.length - 1 && <View style={styles.menuDivider} />}
                </Pressable>
              ))}
            </View>

            {/* Logout */}
            <Pressable onPress={onLogout} style={styles.logoutBtn}>
              <Image source={LOGOUT_PNG} style={{ width: 28, height: 28 }} />
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      {/* ====== /SAĞ MENÜ OVERLAY ====== */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f6f7f8' },
  headerRow: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 3000,
    paddingHorizontal: 14,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: { width: 40, height: 40 },
  headerKebab: { width: 22, height: 22 },
  rightPanel: { position: 'absolute', right: 0, top: 0, width: Math.max(64, width * 0.18), height, zIndex: 1 },

  stage: { flex: 1 },

  card: {
    position: 'absolute',
   
    overflow: 'hidden',
    backgroundColor: 'transparent',

  },

  labelChip: {
    position: 'absolute',
    backgroundColor: '#DADDE0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 200,
  },
  labelText: { fontSize: 12, fontWeight: '600', color: '#444' },

  // Overlay layout: solda beyaz tıklanabilir alan + sağda genişleyen panel
  overlayRow: {
    position: 'absolute',
    left: 0, top: 0,
    width, height,
    flexDirection: 'row',
    zIndex: 2000,
  },
  outsideTouchable: {
    backgroundColor: 'transparent',
  },
  menuPanel: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: -2, height: 0 },
    elevation: 12,
  },
  menuInner: { flex: 1, paddingRight: 20, paddingLeft: 24, alignItems: 'flex-end' },
  menuItem: { width: '100%' },
  menuText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'right', paddingVertical: 6, paddingRight: 24 },
  menuDivider: { alignSelf: 'flex-end', width: 120, height: 2, backgroundColor: '#D6D9DD', marginTop: 6, borderRadius: 2, marginRight: 24 },
  logoutBtn: { position: 'absolute', right: 28, bottom: 36, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
});
