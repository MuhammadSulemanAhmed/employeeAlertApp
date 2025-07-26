import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/Account/Setting';
import ManageUpgradePlan from '../screens/Account/ManageUpgradePlan';

export type AccountStackParamList = {
  AccountScreen: undefined;
  ManageUpgradePlan: undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ManageUpgradePlan" component={ManageUpgradePlan} />
    </Stack.Navigator>
  );
}
