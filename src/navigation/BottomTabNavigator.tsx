import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlertScreen from '../screens/Alert/AlertScreen';
import ContactStack from './ContactStack';
import AccountStack from './AccountStack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName: string;

          if (route.name === 'Alert') iconName = "notifications";
          else if (route.name === 'Contact') iconName = 'groups';
          else iconName = 'account-circle';

          return <MaterialIcons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#8391A1',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 80,
          paddingTop: 5,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontFamily:Fonts.medium,
          letterSpacing:-1,
        },
      })}
    >
      <Tab.Screen name="Alert" component={AlertScreen} />
      <Tab.Screen name="Contact" component={ContactStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}
