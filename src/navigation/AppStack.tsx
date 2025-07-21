import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuildProfile from '../screens/mainScreens/BuildProfile';
import BasicInfo from '../screens/mainScreens/BasicInfo';
import EmergencyContacts from '../screens/mainScreens/EmergencyContacts';

export type AppStackParamList = {
  BuildProfile: undefined;
  BasicInfo: undefined;
  EmergencyContacts: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const AppStack = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (value: boolean) => void;
}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BuildProfile">
        {() => <BuildProfile setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="BasicInfo" component={BasicInfo} />
      <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
    </Stack.Navigator>
  );
};

export default AppStack;
