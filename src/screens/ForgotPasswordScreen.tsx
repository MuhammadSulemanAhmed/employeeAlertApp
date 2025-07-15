import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    if (email.trim() === '') {
      console.log('Email is empty!');
      return;
    }
    console.log('Navigating to OTP with email:', email);
    navigation.navigate('OTP', { phoneOrEmail: email });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={19} color="#1E232C" />
      </TouchableOpacity>

      <Text style={styles.heading}>Forgot Password?</Text>
      <Text style={styles.subText}>
        Don't worry! It occurs. Please enter the email address linked with your
        account.
      </Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#8391A1"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.codeBtn} onPress={handleSendCode}>
        <Text style={styles.CodeText}>Send Code</Text>
      </TouchableOpacity>

      <View style={styles.rememberContainer}>
        <Text style={styles.rememberAccountText}>Remember Password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.rememberText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#ffffff',
  },
  backBtn: {
    width: 41,
    height: 41,
    borderRadius: 12,
    borderColor: '#E8ECF4',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    color: Colors.textDark,
    marginTop: 28,
    fontFamily: Fonts.bold,
  },
  subText: {
    fontFamily: Fonts.medium,
    marginTop:10,
    marginBottom:32,
    fontSize: 16,
    color: '#8391A1',
  },
  input: {
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    padding: 15,
    fontSize: 15,
    color: '#8391A1',
    fontFamily: Fonts.medium,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  codeBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  CodeText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: Fonts.semiBold,
  },
  rememberContainer: {
    marginTop: 361,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 26,
  },
  rememberAccountText: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
  rememberText: {
    color: '#3FC06A',
    fontSize: 15,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
  },
});
