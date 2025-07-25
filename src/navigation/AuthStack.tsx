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
  WelcomeScreen: undefined;
  RegisterScreen:undefined,
  OnboardingOne :undefined,
  OnboardingTwo:undefined,
  OnboardingThree:undefined,
  Login: undefined; 
  ForgotPassword: undefined;
  OTP: { phoneOrEmail: string };
  CreateNewPassword: { otpToken: string };
  PasswordChanged: undefined;
};

interface AuthStackProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = ({ setIsLoggedIn }: AuthStackProps) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="WelcomeScreen"
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}

      </Stack.Screen>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
      <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
      <Stack.Screen name="OnboardingThree" component={OnboardingThree} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPasswordScreen}
      />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
