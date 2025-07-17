import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

  const handleResetPassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      navigation.navigate('PasswordChanged');
    } else {
      Alert.alert('Error', 'Passwords do not match');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={20} color="#1E232C" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Create new password</Text>
        <Text style={styles.subtitle}>
          Your new password must be unique from those previously used.
        </Text>

        <TextInput
          placeholder="New Password"
          placeholderTextColor="#98A2B3"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#98A2B3"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  backArrow: {
    fontSize: 20,
    color: '#000',
  },
  content: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: '#101828',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#667085',
    marginBottom: 32,
    fontFamily: Fonts.regular,
  },
  input: {
    height: 56,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EAECF0',
    marginBottom: 16,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#344054',
  },
  button: {
    backgroundColor: '#32D583',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#000',
  },
});
