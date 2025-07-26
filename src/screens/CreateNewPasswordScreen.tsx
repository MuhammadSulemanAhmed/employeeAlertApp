import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EyeIcon from '../../assets/svg/eye.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CreateNewPassword'
>;

const CreateNewPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const handleResetPassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      navigation.navigate('PasswordChanged');
    } else {
      Alert.alert('Error', 'Passwords do not match');
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
            style={[styles.container, { minHeight: screenDimensions.height }]}
          >
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={20} color="#1E232C" />
              </TouchableOpacity>
              <Text style={styles.title}>Create new password</Text>
              <Text style={styles.subtitle}>
                Your new password must be unique from those previously used.
              </Text>

              <Text style={styles.label}>Enter New password *</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="***********"
                  placeholderTextColor="#8391A1"
                  secureTextEntry={!showNewPassword}
                  style={styles.passwordInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                  <EyeIcon width={22} height={22} />
                </Pressable>
              </View>

              <Text style={[styles.label, { marginTop: 15 }]}>
                Confirm password *
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="***********"
                  placeholderTextColor="#8391A1"
                  secureTextEntry={!showConfirmPassword}
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <EyeIcon width={22} height={22} />
                </Pressable>
              </View>
              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.85]}
                style={styles.gradientButton}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleResetPassword}
                >
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateNewPasswordScreen;

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
  title: {
    fontSize: 28,
    color: Colors.textDark,
    marginTop: 28,
    fontFamily: Fonts.semiBold,
    letterSpacing: -1,
  },
  subtitle: {
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
  button: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    marginTop: 60,
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
  buttonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
