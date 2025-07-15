import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.imgBox}>
        <Image
          source={require('../../assets/images/Vector.png')}
          style={styles.img}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Employee Alert</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imgBox: {
    backgroundColor: '#E4E7EC',
    width: 282,
    height: 282,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  img: {
    width: 158,
    height: 120,
  },
  title: {
    fontSize: 30,
    color:Colors.textDark,
    fontFamily:Fonts.bold,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor:Colors.primary,
    width: 331,
    height: 56,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    fontSize: 15,
    color:Colors.textDark,
    fontFamily:Fonts.semiBold,
  },
  registerButton: {
    borderColor:Colors.buttonBorder,
    borderWidth: 1,
    width: 331,
    height: 56,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerText: {
    fontSize: 15,
    color:Colors.textDark,
    fontFamily:Fonts.semiBold,
  },
});
