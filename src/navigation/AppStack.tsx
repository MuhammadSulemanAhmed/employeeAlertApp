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
import PersonalInfo from '../screens/mainScreens/PersonalInfo';
import Insurance from '../screens/mainScreens/Insurance';
import InsuranceCard from '../screens/mainScreens/InsuranceCard';
import ManageCheck from '../screens/mainScreens/ManageCheck';

import BottomTabNavigator from './BottomTabNavigator';

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
   Insurance:undefined;
 InsuranceCard:undefined;
ManageCheck:undefined;
    Tabs: {
    screen?: 'Alert' | 'Contacts' | 'Account';
  }; 
  PersonalInfo:undefined;
}





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
      <Stack.Screen name="Insurance" component={Insurance} />
      <Stack.Screen name="InsuranceCard" component={InsuranceCard} />
      <Stack.Screen name="ManageCheck" component={ManageCheck} />
    </Stack.Navigator>
  );
};

export default AppStack;
