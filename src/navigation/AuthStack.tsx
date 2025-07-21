import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPasswordScreen';
import PasswordChangedScreen from '../screens/PasswordChangedScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnboardingOne from '../screens/onboarding/OnboardingOne';
import OnboardingTwo from '../screens/onboarding/OnboardingTwo';
import OnboardingThree from '../screens/onboarding/OnboardingThree';



export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  OTP: { phoneOrEmail: string };
  CreateNewPassword: { otpToken: string };
  PasswordChanged: undefined;
  Register: undefined;
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
      <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
      <Stack.Screen name="OnboardingThree" component={OnboardingThree} />
    </Stack.Navigator>
  );
};

export default AuthStack;
