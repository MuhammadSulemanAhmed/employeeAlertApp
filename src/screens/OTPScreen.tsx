import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;

const OTPScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
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
    }
  };

  return (
    <View style={styles.container}>
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
                    backgroundColor: '#F7F8F9',
                    borderColor: '#E8ECF4',
                  }
                : {
                    backgroundColor: '#ffffff',
                    borderColor: '#35C2C1',
                  },
            ]}
            autoFocus={index === 0}
            onSubmitEditing={Keyboard.dismiss}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.infoText}>Didn’t received code? </Text>
        <TouchableOpacity>
          <Text style={styles.resendText}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 22,
  },
  backBtn: {
    width: 41,
    height: 41,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    marginTop: 28,
    fontFamily: Fonts.bold,
    color: Colors.textDark,
  },
  subText: {
    fontSize: 16,
    color: '#838BA1',
    marginTop: 10,
    marginBottom: 32,
    fontFamily: Fonts.medium,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 8,
    width: 70,
    height: 60,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.textDark,
  },
  verifyBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: Fonts.semiBold,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:357,
    marginBottom:26,
  },
  infoText: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
  resendText: {
    fontSize: 15,
    color: '#3FC06A',
    fontFamily: Fonts.bold,
    letterSpacing:1,
  },
});
