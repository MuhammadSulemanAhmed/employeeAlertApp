import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import Spinner from '../../assets/svg/Spinner.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../constants/Fonts';

type Props = {
  visible: boolean;
};

const SuccessDialog: React.FC<Props> = ({ visible }) => {
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });
    return () => subscription?.remove();
  }, []);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (visible) {
      spinAnim.setValue(0);
      const animation = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      animation.start();
      return () => animation.stop();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[styles.dialogBox, { width: screenDimensions.width * 0.8 }]}
        >
          <View style={styles.iconContainer}>
            <View style={styles.iconInner}>
              <Ionicons name="checkmark" size={48} color="#fff" />
            </View>
          </View>

          <Text style={styles.title}>Log in Success</Text>
          <Text style={styles.subtitle}>
            Please wait.{'\n'}You will be directed to the homepage
          </Text>

          <View style={styles.spinContainer}>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Spinner width={26} height={26} />
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessDialog;

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
    fontFamily:Fonts.interSemiBold,
    marginBottom: 8,
    color: '#2C2C2C',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    fontFamily:Fonts.interRegular,
    textAlign: 'center',
    color: '#8391A1',
    lineHeight: 18,
  },
  spinContainer: {
    marginTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:12,
  },
});
