import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import EyeIcon from '../../assets/svg/eye.svg';
import FacebookIcon from '../../assets/svg/facebook.svg';
import GoogleIcon from '../../assets/svg/google.svg';
import AppleIcon from '../../assets/svg/apple.svg';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={19} color="#1E232C" />
      </TouchableOpacity>

      <Text style={styles.heading}>Welcome back!</Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#8391A1"
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#8391A1"
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
        />
        <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
          <EyeIcon width={22} height={22} />
        </Pressable>
      </View>

      <TouchableOpacity style={styles.forgotPassword} 
      onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Or Login with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialIcons}>
        <TouchableOpacity style={[styles.iconBox, { marginRight: 8 }]}>
          <FacebookIcon width={26} height={26} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconBox, { marginRight: 8 }]}>
          <GoogleIcon width={26} height={26} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBox}>
          <AppleIcon width={26} height={26} />
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerAccountText}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
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
    marginVertical: 20,
    fontFamily: Fonts.bold,
  },
  input: {
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    padding: 15,
    fontSize: 15,
    color: '#8391A1',
    marginBottom: 15,
    fontFamily: Fonts.medium,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#8391A1',
    fontFamily: Fonts.medium,
  },
  forgotPassword: {
    marginTop: 15,
    marginBottom: 30,
    padding: 1,
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#6A707C',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  loginText: {
    fontSize: 15,
    color: Colors.textDark,
    fontFamily: Fonts.semiBold,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8ECF4',
  },
  separatorText: {
    marginHorizontal: 12,
    color: '#6A707C',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    height: 56,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerContainer: {
    marginTop: 203,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 26,
  },
  registerAccountText: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    color:Colors.textDark,
  },
  registerText: {
    color:"#3FC06A",
    fontSize: 15,
    fontFamily: Fonts.bold,
    letterSpacing:1,
  },
});
