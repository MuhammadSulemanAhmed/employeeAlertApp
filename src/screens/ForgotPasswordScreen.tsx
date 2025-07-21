import React, { useState,useEffect } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
     const subscription = Dimensions.addEventListener('change', ({ window }) => {
       setScreenDimensions(window);
     });
 
     return () => subscription?.remove();
   }, []);

  const handleSendCode = () => {
    if (email.trim() === '') {
      return;
    }
    navigation.navigate('OTP', { phoneOrEmail: email });
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

                <Text style={styles.heading}>Forgot Password?</Text>
                <Text style={styles.subText}>
                  Don't worry! It occurs. Please enter the email address linked
                  with your account.
                </Text>
                <View>
                  <Text style={styles.label}>Email *</Text>
                  <TextInput
                    placeholder="Email@example.com"
                    placeholderTextColor="#8391A1"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0, 0.85]}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    style={styles.codeBtn}
                    onPress={handleSendCode}
                  >
                    <Text style={styles.CodeText}>Send Code</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View style={styles.rememberContainer}>
                <Text style={styles.rememberAccountText}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.rememberText}> Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

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
    flexShrink: 1,
    justifyContent: 'flex-start',
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
  codeBtn: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    marginTop: 60,
    borderRadius: 8,
    width: '100%',
    padding: 2,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  CodeText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
  rememberContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
    width: '100%',
  },
  rememberAccountText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    letterSpacing: 1,
  },
  rememberText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: Fonts.bold,
    letterSpacing: 1,
  },
});
