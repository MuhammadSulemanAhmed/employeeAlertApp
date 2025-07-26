import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type Props = {
  visible: boolean;
  onClose: () => void;
};

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const GroupCreateDialog: React.FC<Props> = ({ visible, onClose }) => {
  const navigation = useNavigation<NavigationProp>();
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[styles.dialogBox, { width: screenDimensions.width * 0.8 }]}
        >
          <View style={styles.iconContainer}>
            <View style={styles.iconInner}>
              <Ionicons name="checkmark" size={48} color="#fff" />
            </View>
          </View>

          <Text style={styles.title}>Group Created</Text>
          <Text style={styles.subtitle}>
            Start you conversation with all members of the group
          </Text>

          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.85]}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              onPress={() => {
                if (typeof onClose === 'function') {
                  onClose();
                }
                navigation.navigate('UpgradeToPremium');
              }}
              style={styles.conversationButton}
            >
              <Text style={styles.conversationButtonText}>
                Start Conversation
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default GroupCreateDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#001206B5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    width: '100%',
    maxWidth: 309,
    height: 299.75,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 28,
    paddingHorizontal: 21,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  iconContainer: {
    width: 83,
    height: 83,
    borderRadius: 52,
    backgroundColor: '#50CE762B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconInner: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#3FC06A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.interSemiBold,
    color: '#2C2C2C',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: Fonts.interRegular,
    textAlign: 'center',
    color: '#8391A1',
    lineHeight: 18,
  },
  gradientButton: {
    marginTop: 20,
    borderRadius: 8,
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  conversationButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  conversationButtonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
