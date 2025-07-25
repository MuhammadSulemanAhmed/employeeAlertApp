import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPasswordScreen';
import PasswordChangedScreen from '../screens/PasswordChangedScreen';


export type AuthStackParamList = {
  Welcome: undefined;
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
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
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
