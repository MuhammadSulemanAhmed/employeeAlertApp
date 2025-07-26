import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;

const OTPScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);
  const { phoneOrEmail } = route.params as { phoneOrEmail: string };

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = otp.join('');
    if (fullCode.length === 4) {
      console.log('Entered OTP:', fullCode);
      navigation.navigate('CreateNewPassword', { otpToken: fullCode });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.backgroundColor,
            minHeight: screenDimensions.height,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[styles.wrapper, { minHeight: screenDimensions.height }]}
          >
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={20} color="#1E232C" />
              </TouchableOpacity>

              <Text style={styles.heading}>OTP Verification</Text>
              <Text style={styles.subText}>
                Enter the verification code we just sent on your email address.
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref: TextInput | null) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={value => handleChange(index, value)}
                    keyboardType="numeric"
                    maxLength={1}
                    style={[
                      styles.otpInput,
                      digit === ''
                        ? {
                            borderColor: '#E8ECF4',
                          }
                        : {
                            borderColor: '#35C2C1',
                          },
                    ]}
                    autoFocus={index === 0}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                ))}
              </View>

              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.85]}
                style={styles.gradientButton}
              >
                <TouchableOpacity
                  style={styles.verifyBtn}
                  onPress={handleVerify}
                >
                  <Text style={styles.verifyText}>Verify</Text>
                </TouchableOpacity>
              </LinearGradient>
              <View style={styles.resendContainer}>
                <Text style={styles.infoText}>Didn't receive a code? </Text>
                <TouchableOpacity>
                  <Text style={styles.resendText}>Resend</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 328,
    justifyContent: 'flex-start',
    flex: 1,
    alignItems: 'flex-start',
  },
  backBtn: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 28,
    color: Colors.textDark,
    marginTop: 28,
    fontFamily: Fonts.semiBold,
    letterSpacing: -1,
  },
  subText: {
    fontFamily: Fonts.medium,
    marginTop: 10,
    marginBottom: 25,
    fontSize: 14,
    lineHeight: 22,
    color: '#8391A1',
  },
  otpContainer: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 328,
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  otpInput: {
    borderWidth: 1.63,
    borderRadius: 6.53,
    width: 76,
    height: 57,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.textDark,
    backgroundColor: '#F7F8F9',
  },
  verifyBtn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
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
  verifyText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  infoText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: '#6C6C6C',
  },
  resendText: {
    color: '#0E1517',
    fontSize: 12,
    fontFamily: Fonts.bold,
  },
});
