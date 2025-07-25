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
  Dimensions,
  Alert,
} from 'react-native';
import SuccessDialog from '../components/SuccessDialog ';
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

// Add type for props
interface LoginScreenProps {
  setIsLoggedIn: (value: boolean) => void;
}

const LoginScreen = ({ setIsLoggedIn }: LoginScreenProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Please enter both email and password');
      return;
    }
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setIsLoggedIn(true); 
    }, 3000);
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
            style={[styles.container, { minHeight: screenDimensions.height }]}
          >
            <View style={styles.content}>
              <View style={styles.topContent}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={19} color="#1E232C" />
                </TouchableOpacity>
                <Text style={styles.heading}>Welcome back!</Text>
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Email *</Text>
                  <TextInput
                    placeholder="Email@example.com"
                    placeholderTextColor="#8391A1"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View>
                  <Text style={styles.label}>Enter password *</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="***********"
                      placeholderTextColor="#8391A1"
                      secureTextEntry={!passwordVisible}
                      style={styles.passwordInput}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <Pressable
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      <EyeIcon width={22} height={22} />
                    </Pressable>
                  </View>
                  <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0, 0.85]}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    style={styles.loginButton} 
                    onPress={handleLogin}
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableOpacity>
                </LinearGradient>
                {showSuccess && <SuccessDialog visible={showSuccess} />}
                <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <Text style={styles.separatorText}>Or Login with</Text>
                  <View style={styles.line} />
                </View>
                <View style={styles.socialIcons}>
                  <TouchableOpacity
                    style={[styles.iconBox, { marginRight: 8 }]}
                  >
                    <FacebookIcon width={26} height={26} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.iconBox, { marginRight: 8 }]}
                  >
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
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={styles.registerText}>Register Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 40,
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
    fontSize: 30,
    color: Colors.textDark,
    marginVertical: 20,
    fontFamily: Fonts.bold,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    marginBottom: 5,
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
    paddingRight: 2,
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#6A707C',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  loginButton: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    marginTop:30,
    borderRadius: 8,
    width: '100%',
    padding: 2,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  loginText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 60,
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
    marginBottom: 50,
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
