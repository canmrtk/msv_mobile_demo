import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface AnimatedCoinsProps {
  imageUrl?: string;
}

const AnimatedCoins: React.FC<AnimatedCoinsProps> = ({ 
  
  imageUrl = 'https://media2.giphy.com/media/v1.Y2lkPWFjZDIxNDQwem44eHZibG0xbDNseXEyZmVtMjB5MXB5MHYwMnE5MDNmbWRjdnM0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1z/l1J9EQhfkb8tPu836/giphy.webp'
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        // Animation tamamlandığında tekrar başlat
        setTimeout(startAnimation, 1000);
      });
    };

    startAnimation();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, screenHeight + 100],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.1, 0.9, 1],
    outputRange: [0, 1, 1, 0],
  });

  const coins = Array.from({ length: 8 }, (_, index) => {
    const delay = index * 400; // Her coin için farklı gecikme
    const leftPosition = Math.random() * (screenWidth - 50); // Rastgele x pozisyonu

    return (
      <Animated.View
        key={index}
        style={[
          styles.coin,
          {
            left: leftPosition,
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.coinImage}
          contentFit="cover"
        />
      </Animated.View>
    );
  });

  return <>{coins}</>;
};

const styles = StyleSheet.create({
  coin: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: -50,
  },
  coinImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});

export default AnimatedCoins;
