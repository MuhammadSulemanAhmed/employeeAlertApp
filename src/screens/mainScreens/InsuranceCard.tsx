import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');
import { AuthStackParamList } from '../../navigation/AuthStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const InsuranceCard = () => {

  const navigation = useNavigation<NavigationProp>();
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

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
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={19} color="#1E232C" />
            </TouchableOpacity>

            <Text style={styles.tittle}>Insurance</Text>
            <Text style={styles.subtittle}>Add insurance card images</Text>
            <View style={styles.shareBox}>
              <Image
                source={require('../../../assets/images/InsuranceCard.png')}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.Text}>Front image added</Text>

            </View>
            <View style={styles.shareBoxx}>
              <Image
                source={require('../../../assets/images/InsuranceCardOne.png')}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.Text}>Back image added</Text>

            </View>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.85]}
              style={styles.gradientButton}
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default InsuranceCard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 375,
    flex: 1,
  },
  topContent: {
    flex: 1,
    width: '100%',
  },
  backBtn: {
    width: 41,
    height: 41,
    borderRadius: 12,
    left: 20,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  tittle: {
    fontSize: 28,
    color: Colors.textDark,
    marginTop: 28,
    left: 10,
    lineHeight: 36,
    fontFamily: Fonts.semiBold,
  },
  subtittle: {
    fontSize: 16,
    color: Colors.textDark,
    fontFamily: Fonts.semiBold,
    marginTop: 25,
    marginBottom: 5,
    left: 10,
  },
  shareBox: {
    alignSelf: 'center',
    width: 328,
    height: 238,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.backgroundColor,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  shareBoxx: {
    marginTop: 35,
    alignSelf: 'center',
    width: 328,
    height: 238,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.backgroundColor,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    alignSelf: 'center',
    marginTop: 12,
  },
  Text: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 12,
    color: '#6A707C',
    fontFamily: Fonts.semiBold,
  },
  gradientButton: {
    marginTop: 30,
    borderRadius: 8,
    maxWidth: 296,
    height: 42,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
