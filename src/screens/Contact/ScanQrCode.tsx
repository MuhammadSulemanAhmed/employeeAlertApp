import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import { ContactStackParamList  } from '../../navigation/ContactStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');

type CombinedParamList = AppStackParamList & ContactStackParamList;
type NavigationProp = NativeStackNavigationProp<CombinedParamList>;

const ScanQrCode = () => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this link: https://developer.android.com/',
        url: 'https://developer.android.com/',
        title: 'Scan to Upgrade',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared via: ', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing:', error.message);
    }
  };
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
      <LinearGradient
        colors={[
          (Colors.ScanUpGradeStart = 'rgba(255, 248, 111, 0.75)'),
          Colors.ScanUpGradeEnd,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.65]}
        style={[styles.container, { minHeight: screenDimensions.height }]}
      >
        <View style={styles.topContent}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={19} color="#1E232C" />
          </TouchableOpacity>
          <View style={styles.box}>
            <Image
              source={require('../../../assets/images/scan.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.scanText}>Have Them Scan Me</Text>
            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.line} />
            </View>
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.85]}
              style={styles.gradientButton}
            >
              <TouchableOpacity style={styles.button} onPress={handleShare}>
                <View style={styles.iconTextRow}>
                  <Ionicons
                    name="link-outline"
                    size={24}
                    color={Colors.backgroundColor}
                    style={{ transform: [{ rotate: '-45deg' }] }}
                  />
                  <Text style={styles.buttonText}>Send as a link</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default ScanQrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    flex: 1,
    padding: 24,
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
  box: {
    width: 328,
    height: 436,
    marginTop: 68,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.backgroundColor,
    shadowColor: '#101922',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 229,
    height: 229,
    alignSelf: 'center',
    marginTop: 35,
  },
  scanText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    alignSelf: 'center',
    marginTop: 21,
  },
  separatorContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    maxWidth: 214,
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  separatorText: {
    marginHorizontal: 12,
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  gradientButton: {
    borderRadius: 5,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 296,
    height: 43,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.medium,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
