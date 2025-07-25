import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuildProfile from '../screens/mainScreens/BuildProfile';
import Insurance from '../screens/mainScreens/Insurance';
import InsuranceCard from '../screens/mainScreens/InsuranceCard';
import ManageCheck from '../screens/mainScreens/ManageCheck';

export type AppStackParamList = {
  BuildProfile: undefined;
 

 Insurance:undefined;
 InsuranceCard:undefined;
ManageCheck:undefined;
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
      <Stack.Screen name="Insurance" component={Insurance} />
      <Stack.Screen name="InsuranceCard" component={InsuranceCard} />
      <Stack.Screen name="ManageCheck" component={ManageCheck} />
    </Stack.Navigator>
  );
};

export default AppStack;
