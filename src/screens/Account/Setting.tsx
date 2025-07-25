import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import { AccountStackParamList } from '../../navigation/AccountStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomToggle from '../../components/CustomToggle';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type CombinedParamList = AppStackParamList & AccountStackParamList;
type NavigationProp = NativeStackNavigationProp<CombinedParamList>;


const Setting = () => {
  const navigation = useNavigation<NavigationProp>();
  const tabBarTranslate = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);
  const [gpsEnabled, setGpsEnabled] = React.useState(true);
  const [textAlert, setTextAlert] = React.useState(true);
  const [voiceAlert, setVoiceAlert] = React.useState(true);
  const [vibration, setVibration] = React.useState(true);
  const [showMedicalInfo, setShowMedicalInfo] = React.useState(true);
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('English');
  const [showTimerDropdown, setShowTimerDropdown] = React.useState(false);
  const [selectedTimer, setSelectedTimer] = React.useState('Every 5 mins');
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });
    return () => {
      subscription?.remove();
    };
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > lastOffset.current ? 'down' : 'up';
    lastOffset.current = currentOffset;

    Animated.timing(tabBarTranslate, {
      toValue: direction === 'down' ? 100 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const languages = [
    'English',
    'Germany',
    'Chinese',
    'Korean',
    'Arabic',
    'Spanish',
  ];
  const timers = [
    'Every 5 mins',
    'Every 10 mins',
    'Every 15 mins',
    'Every 30 mins',
  ];

  const Dropdown = ({ visible, options, selected, onSelect }: any) => {
    if (!visible) return null;
    return (
      <View style={{ backgroundColor: 'Colors.backgroundColor', padding: 15 }}>
        {options.map((option: string) => (
          <TouchableOpacity
            key={option}
            style={{
              paddingVertical: 8,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
            }}
            onPress={() => onSelect(option)}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: selected === option ? Colors.primary : '#1C1C1C',
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  selected === option ? Colors.primary : 'transparent',
              }}
            >
              {selected === option && (
                <Ionicons name="checkmark" size={9} color="#fff" />
              )}
            </View>
            <Text
              style={{
                fontSize: 10,
                fontFamily: Fonts.medium,
                color: Colors.textDark,
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const SettingItem = ({ label, value, dropdown ,onPress }: any) => (
    <TouchableOpacity onPress={onPress} style={styles.settingItem}>
      <Text style={styles.settingLabel}>{label}</Text>
      {value ? (
        <Text style={styles.settingValue}>{value}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={14} color={Colors.textDark} />
      )}
      {dropdown && (
        <Ionicons name="chevron-down" style={{paddingLeft:4}} size={14} color={Colors.textDark} />
      )}
    </TouchableOpacity>
  );

  const ToggleSetting = ({ label, value, onValueChange }: any) => (
    <View style={styles.toggleRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <CustomToggle isOn={value} onToggle={onValueChange} />
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding:24,
        backgroundColor: Colors.backgroundColor,
        minHeight: screenDimensions.height,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.container, { minHeight: screenDimensions.height }]}>
        <View style={styles.content}>
          <ScrollView
            style={{ width: '100%' }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <Text style={styles.greeting}>Hi, Tuna</Text>

        
            <Text style={styles.sectionTitle}>Employee Alert Plan</Text>
            <View style={styles.planBox}>
              <View>
                <Text style={styles.planTitle}>Small Team Plan</Text>
                <Text style={styles.planDate}>Until 03/03/2026</Text>
              </View>
              <TouchableOpacity 
              onPress={() => navigation.navigate('ManageUpgradePlan')}
              style={styles.upgradeButton}>
                <Text style={styles.upgradeText}>Upgrade</Text>
              </TouchableOpacity>
            </View>

           
            <Text style={styles.sectionTitle}>Login & Security</Text>
            <View style={styles.card}>
              <SettingItem 
              label="Personal Info"
              onPress={() => navigation.navigate('PersonalInfo')}
               />
              <SettingItem label="Change password" />
              <SettingItem label="Log out" />
            </View>

         
            <Text style={styles.sectionTitle}>Medical Information</Text>
            <View style={styles.card}>
              <View style={styles.medicalRow}>
                <View>
                  <Text style={styles.medicalName}>Dr. Joshua Garber</Text>
                  <Text style={styles.medicalSub}>+1 293-4053-242</Text>
                </View>
                <View style={styles.tagContainer}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Primary Care</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.edit}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <SettingItem label="Insurance" />
              <SettingItem label="Medical History" />
            </View>

         
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.card}>
              <ToggleSetting
                label="GPS location access"
                value={gpsEnabled}
                onValueChange={() => setGpsEnabled(!gpsEnabled)}
              />
              <ToggleSetting
                label="Send alert as text"
                value={textAlert}
                onValueChange={() => setTextAlert(!textAlert)}
              />
              <ToggleSetting
                label="Send alert in voice"
                value={voiceAlert}
                onValueChange={() => setVoiceAlert(!voiceAlert)}
              />
              <ToggleSetting
                label="Device vibration"
                value={vibration}
                onValueChange={() => setVibration(!vibration)}
              />
              <ToggleSetting
                label={"Show medical information \nto health provider in emergent"}
                value={showMedicalInfo}
                onValueChange={() => setShowMedicalInfo(!showMedicalInfo)}
              />
              <TouchableOpacity
                onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <SettingItem
                  label="Text language"
                  value={selectedLanguage}
                  dropdown
                />
              </TouchableOpacity>
              <Dropdown
                visible={showLanguageDropdown}
                options={languages}
                selected={selectedLanguage}
                onSelect={(val: string) => {
                  setSelectedLanguage(val);
                  setShowLanguageDropdown(false);
                }}
              />

              <TouchableOpacity
                onPress={() => setShowTimerDropdown(!showTimerDropdown)}
              >
                <SettingItem label="Alert timer" value={selectedTimer} dropdown />
              </TouchableOpacity>
              <Dropdown
                visible={showTimerDropdown}
                options={timers}
                selected={selectedTimer}
                onSelect={(val: string) => {
                  setSelectedTimer(val);
                  setShowTimerDropdown(false);
                }}
              />
            </View>
            <View style={{ height: 36 }} />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 328,
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    letterSpacing: -1,
    marginTop:2,
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    letterSpacing: -1,
    marginBottom: 7,
  },
  planBox: {
    backgroundColor: Colors.backgroundColor,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginBottom: 30,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },
  planTitle: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
  planDate: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Colors.textLight,
    marginTop: 2,
  },
  upgradeButton: {
    backgroundColor: '#FFB845',
    paddingVertical: 3,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  upgradeText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    letterSpacing: -1,
  },
  card: {
    backgroundColor: Colors.backgroundColor,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 16,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 14,
    flex: 1,
    paddingRight: 10,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
  },
  settingValue: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  medicalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  medicalName: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
  },
  medicalSub: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#CCCCCC',
  },
  tagContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  tag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagText: {
    color: Colors.backgroundColor,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    letterSpacing: -1,
  },
  edit: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: Colors.primary,
    textDecorationColor: Colors.primary,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    marginTop: 5,
    marginRight: 4,
  },
});

export default Setting;