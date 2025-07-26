import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';


type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const UpgradeToPremium = () => {
  const navigation = useNavigation<NavigationProp>();
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.backgroundColor,
        minHeight: screenDimensions.height,
      }}
    >
      <View style={[styles.container, { minHeight: screenDimensions.height }]}>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={19} color="#1E232C" />
            </TouchableOpacity>
            <Text style={styles.title}>Upgrade to Premium</Text>
            <Text style={styles.subTitle}>
              to add more than one emergency contact.
            </Text>
          <View style={styles.imgBox}>
            <Image
              source={require('../../../assets/images/upgrade.png')}
              style={styles.img}
              resizeMode="contain"
            />
          </View>
          </View>


          <View style={{marginBottom:26}}>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.85]}
              style={styles.gradientButton}
            >
              <TouchableOpacity style={styles.loginButton}
              onPress={() => navigation.navigate("Tabs",{screen:"Account"})}
               >
                <Text style={styles.loginText}>Upgrade Now</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity style={styles.registerButton} onPress={() => {}}>
              <Text style={styles.registerText}>Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpgradeToPremium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 328,
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  backBtn: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    color: Colors.textDark,
    fontFamily: Fonts.medium,
    marginTop:28,
    marginBottom: 10,
    letterSpacing:-1,

  },
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    lineHeight: 22,
    color: Colors.textLight,
  
  },
  imgBox: {
    width: '100%',
    maxWidth: 319,
    height: 346,
    marginTop:41,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10.45,
  },

  loginButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    borderRadius: 8,
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  loginText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
  registerButton: {
    backgroundColor: '#E8ECF4',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  registerText: {
    fontSize: 15,
    color: Colors.textDark,
    fontFamily: Fonts.medium,
  },
});
