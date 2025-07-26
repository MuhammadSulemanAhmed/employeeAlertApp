/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  return (
    <NavigationContainer>
     {isLoggedIn ?  <AppStack setIsLoggedIn={setIsLoggedIn}/>  : <AuthStack setIsLoggedIn={setIsLoggedIn}/>  } 
    </NavigationContainer>
  );
}

export default App;
