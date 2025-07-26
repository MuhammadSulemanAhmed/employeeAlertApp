import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import { AccountStackParamList } from '../../navigation/AccountStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type CombinedParamList = AppStackParamList & AccountStackParamList;
type NavigationProp = NativeStackNavigationProp<CombinedParamList>;

const ManageUpgradePlan = () => {
  const navigation = useNavigation<NavigationProp>();
  const screenDimensions = Dimensions.get('window');
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
            <Text style={styles.heading}>Employee Alert Plan</Text>

            <View style={styles.TopBox}>
              <View style={styles.topBox}>
                <Text style={styles.touchText}>Current Plan</Text>
              </View>
              <View style={styles.bottomBox}>
                <View style={styles.rowText}>
                  <Text style={styles.boxText}>Individual Plan</Text>
                  <View style={styles.smallBox}>
                    <Text style={styles.smallBoxText}>Free</Text>
                  </View>
                </View>
                <Text style={styles.subtitle}>
                  {'Alert to one emergency contact \nNo access to add members'}
                </Text>
              </View>
            </View>
            <View style={styles.TopBox}>
              <View style={styles.upgradeBox}>
                <Text style={styles.upgradetouchText}>Upgrade Plan</Text>
              </View>
              <View style={styles.bottomBox}>
                <View style={styles.rowText}>
                  <Text style={styles.boxText}>Small Team Plan</Text>
                  <View style={styles.smallBox}>
                    <Text style={styles.smallBoxText} onPress={() => navigation.navigate('ManageCheck')}>$6/mo</Text>
                  </View>
                </View>
                <Text style={styles.subtitle}>
                  {
                    'Alert up to 3 emergency contacts \nShare alert service with 4 members.'
                  }
                </Text>
              </View>
            </View>
            <View style={styles.TopBox}>
              <View style={styles.upgradeBox}>
                <Text style={styles.upgradetouchText}>Upgrade Plan</Text>
              </View>
              <View style={styles.bottomBox}>
                <View style={styles.rowText}>
                  <Text style={styles.boxText}>Unlimited Team Plan</Text>
                  <View style={styles.smallBox}>
                    <Text style={styles.smallBoxText}>$12/mo</Text>
                  </View>
                </View>
                <Text style={styles.subtitle}>
                  {
                    'Alert to unlimited emergency contacts \nShare alert service with unlimited members'
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ManageUpgradePlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 328,
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
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
  heading: {
    fontSize: 28,
    color: Colors.textDark,
    fontFamily: Fonts.semiBold,
    letterSpacing: -1,
    marginTop: 28,
    marginBottom: 39,
  },
  TopBox: {
    width: 328,
    height: 122,
    marginBottom: 28,
  },
  topBox: {
    alignSelf: 'flex-end',
    width: 133,
    height: 29,
    marginRight: 4,
    backgroundColor: Colors.gradientEnd,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBox: {
    alignSelf: 'flex-end',
    width: 133,
    height: 29,
    marginRight: 4,
    backgroundColor: Colors.textLight,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    color: Colors.textDark,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  upgradetouchText: {
    color: Colors.backgroundColor,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  bottomBox: {
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 6,
    borderWidth: 1,
    width: 328,
    borderColor: Colors.borderColor,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },

  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
  },
  smallBox: {
    width: 61,
    borderRadius: 15,
    height: 22,
    borderWidth: 1,
    backgroundColor: '#50CE760A',
    borderColor: '#50CE76',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBoxText: {
    color: '#50CE76',
    fontSize: 12,
    fontFamily: Fonts.semiBold,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: Fonts.regular,
    color: Colors.textLight,
    lineHeight: 19,
  },
});
