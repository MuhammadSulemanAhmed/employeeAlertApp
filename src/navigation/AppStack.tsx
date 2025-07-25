import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuildProfile from '../screens/mainScreens/BuildProfile';
import BasicInfo from '../screens/mainScreens/BasicInfo';
import EmergencyContacts from '../screens/mainScreens/EmergencyContacts';
import EmergencyContactForm from '../screens/mainScreens/EmergencyContactForm';
import EmergencyContactsList from '../screens/mainScreens/EmergencyContactsList';
import MonitoredContacts from '../screens/mainScreens/MonitoredContacts';
import CreateGroup from '../screens/mainScreens/CreateGroup';
import AddGroupMembers from '../screens/mainScreens/AddGroupMembers';
import UpgradeToPremium from '../screens/mainScreens/UpgradeToPremium';
import Setting from '../screens/Account/Setting';
import BottomTabNavigator from './BottomTabNavigator';
import PersonalInfo from '../screens/mainScreens/PersonalInfo';

export type AppStackParamList = {
  BuildProfile: undefined;
  BasicInfo: undefined;
  EmergencyContacts: undefined;
  EmergencyContactForm: undefined;
  EmergencyContactsList: undefined;
  MonitoredContacts: undefined;
  CreateGroup: undefined;
  AddGroupMembers: undefined;
  UpgradeToPremium: undefined;
  Setting: undefined;
    Tabs: {
    screen?: 'Alert' | 'Contacts' | 'Account';
  }; 
  PersonalInfo:undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const AppStack = ({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      
      <Stack.Screen name="BuildProfile">
        {() => <BuildProfile setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="BasicInfo" component={BasicInfo} />
      <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
      <Stack.Screen name="EmergencyContactForm" component={EmergencyContactForm} />
      <Stack.Screen name="EmergencyContactsList" component={EmergencyContactsList} />
      <Stack.Screen name="MonitoredContacts" component={MonitoredContacts} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="AddGroupMembers" component={AddGroupMembers} />
      <Stack.Screen name="UpgradeToPremium" component={UpgradeToPremium} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

export default AppStack;
