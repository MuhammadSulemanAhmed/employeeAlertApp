import React, { useState, useEffect } from 'react';
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
  Pressable, 
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
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

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    navigation.navigate('OnboardingOne');
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
          <View style={[styles.container, { minHeight: screenDimensions.height }]}>
            <View style={styles.content}>
              <View style={styles.topContent}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={19} color="#1E232C" />
                </TouchableOpacity>
                <Text style={styles.heading}>Hello! Register to get started</Text>
                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.label}>Phone Number *</Text>
                  <TextInput
                    placeholder="(954) 123 9303"
                    placeholderTextColor="#8391A1"
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.label}>Email *</Text>
                  <TextInput
                    placeholder="Email@example.com"
                    placeholderTextColor="#8391A1"
                    style={styles.input}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.label}>Enter password *</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="***********"
                      placeholderTextColor="#8391A1"
                      secureTextEntry={!showPassword}
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={setPassword}

                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <EyeIcon width={22} height={22} />
                    </Pressable>
                  </View>
                </View>
                <View style={{ marginBottom: 35 }}>
                  <Text style={styles.label}>Confirm password *</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="***********"
                      placeholderTextColor="#8391A1"
                      secureTextEntry={!showConfirmPassword}
                      style={styles.passwordInput}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}

                    />
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <EyeIcon width={22} height={22} />
                    </Pressable>
                  </View>
                </View>
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0, 0.85]}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                </LinearGradient>

                <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <Text style={styles.separatorText}>Or Register with</Text>
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
              </View>
              <View style={styles.registerContainer}>
                <Text style={styles.registerAccountText}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerText}>Register Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 328,
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
    marginTop :12,
    justifyContent: 'flex-start',
    width: '100%',
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
    marginTop: 20,
    lineHeight: 36,
    fontFamily: Fonts.semiBold,
    paddingBottom: 25,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    marginBottom: 5,
    lineHeight: 17.5,
  },
  input: {
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    height: 44,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    color: '#8391A1',
    fontFamily: Fonts.medium,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#8391A1',
    width: '100%',
    height: 46,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#8391A1',
    fontFamily: Fonts.medium,
    paddingVertical: 0,
  },
  forgotPassword: {
    marginTop: 15,
    marginBottom: 30,
    paddingRight: 18,
    alignSelf: 'flex-end',
  },
  gradientButton: {
    borderRadius: 8,
    width: '100%',
    padding: 2,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 24,
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
    marginBottom: 29.91,
  },
  iconBox: {
    backgroundColor: '#F7F8F9',
    height: 51.09,
    borderRadius: 7.3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 1.82, height: 2.74 },
    shadowOpacity: 0.08,
    shadowRadius: 3.65,
    elevation: 3,
  },
  registerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  registerAccountText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    letterSpacing: 1,
  },
  registerText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
  },



});
