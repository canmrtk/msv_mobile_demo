import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { CreditCardIcon, ChartIcon, TagIcon, GiftIcon, BellIcon, PersonIcon } from '@/components/svg-icons';

interface MembershipCardProps {
  title: string;
  iconType: 'creditcard' | 'chart' | 'tag' | 'gift' | 'bell' | 'person';
  onPress?: () => void;
  style?: ViewStyle;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  title,
  iconType,
  onPress,
  style,
}) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'creditcard':
        return <CreditCardIcon size={64} color="#ffffff" />;
      case 'chart':
        return <ChartIcon size={64} color="#ffffff" />;
      case 'tag':
        return <TagIcon size={64} color="#ffffff" />;
      case 'gift':
        return <GiftIcon size={64} color="#ffffff" />;
      case 'bell':
        return <BellIcon size={64} color="#ffffff" />;
      case 'person':
        return <PersonIcon size={64} color="#ffffff" />;
      default:
        return <CreditCardIcon size={64} color="#ffffff" />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(155,204,198,0.59)',
    borderRadius: 25.92,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 162,
    height: 162,
    opacity: 0.56,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.82,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default MembershipCard;
