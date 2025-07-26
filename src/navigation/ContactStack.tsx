import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactMain from '../screens/Contact/ContactMain';
import EmergencyContact from '../screens/Contact/EmergencyContact';
import ScanQrCode from '../screens/Contact/ScanQrCode';

export type ContactStackParamList = {
  ContactMain: undefined;
  EmergencyContact: undefined;
  ScanQrCode:undefined; // Example param
};

const Stack = createNativeStackNavigator<ContactStackParamList>();

export default function ContactStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ContactMain" component={ContactMain} />
      <Stack.Screen name="EmergencyContact" component={EmergencyContact} />
      <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
    </Stack.Navigator>
  );
}
