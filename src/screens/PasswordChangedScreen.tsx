import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const PasswordChangedScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  Dimensions.addEventListener('change', ({ window }) => {
    setScreenDimensions(window);
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={20} color="#1E232C" />
            </TouchableOpacity>
            <View style={styles.messageContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.iconInner}>
                   <Ionicons name="checkmark" size={40} color="#fff" />
                </View>
              </View>
              <Text style={styles.title}>Password Changed</Text>
              <Text style={styles.subtitle}>
                Your password has been changed successfully.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Back to login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordChangedScreen;

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
    justifyContent: 'flex-start',
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
  messageContainer: {
    marginTop: 28,
    alignItems: 'center',
  },
  iconContainer: {
    width: '100%',
    maxWidth: 104,
    height: 104,
    overflow:'hidden',
    padding:10,
  },
  iconInner: {
    width: '100%',
    backgroundColor: '#3FC06A',
    borderRadius:100,
  },
  title: {
    fontSize: 30,
    color: Colors.textDark,
    fontFamily: Fonts.bold,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#838BA1',
    fontFamily: Fonts.medium,
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 15,
    color: '#000000',
    fontFamily: Fonts.semiBold,
  },
});
