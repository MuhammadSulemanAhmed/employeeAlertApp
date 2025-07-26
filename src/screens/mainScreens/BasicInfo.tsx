import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

type NavigationProp = NativeStackNavigationProp<AppStackParamList, 'BasicInfo'>;
const BasicInfo = () => {
  const navigation = useNavigation<NavigationProp>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dobDate, setDobDate] = useState<Date | null>(null);
  const [dob, setDob] = useState('');
  const [isContractor, setIsContractor] = useState(false);
  const [address, setAddress] = useState('');
  const screen = useWindowDimensions();
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    dob?: string;
  }>({});

  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('window'),
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event?.type === 'set' && selectedDate) {
      setDobDate(selectedDate);
      const formatted = selectedDate.toLocaleDateString('en-Us');
      setDob(formatted);
      if (errors.dob) {
        setErrors(prev => ({ ...prev, dob: undefined }));
      }
    }
  };
  const validate = () => {
    const newErrors: { firstName?: string; lastName?: string; dob?: string } =
      {};
    if (!firstName.trim()) newErrors.firstName = 'Required *';
    if (!dob.trim()) newErrors.dob = 'Required *';
    if (!lastName.trim()) newErrors.lastName = 'Required *';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validate()) {
      navigation.navigate('EmergencyContacts');
    }
  };

  const hasRequiredErrors = errors.firstName || errors.lastName || errors.dob;
  const isLandscape = screen.width > screen.height;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.backgroundColor,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View
                style={[
                  styles.backbtnContainer,
                  isLandscape && {
                    alignSelf: 'center',
                    width: 328,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <Ionicons name="chevron-back" size={24} color="#1E232C" />
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.progressBarWrapper,
                  isLandscape && {
                    alignSelf: 'center',
                    width: 328,
                  },
                ]}
              >
                <View style={styles.progress} />
                <View style={styles.incomplete} />
                <View style={styles.incomplete} />
              </View>

              <View
                style={[
                  styles.innerContent,
                  { width: screenDimensions.width - 48 },
                ]}
              >
                <Text style={styles.title}>Basic Info</Text>
                <Text style={styles.description}>
                  To instantly alert employers and promote team safety while on
                  site.
                </Text>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>First Name *</Text>
                  <TextInput
                    placeholder={errors.firstName ? '' : 'Tuna'}
                    placeholderTextColor="#8391A1"
                    value={firstName}
                    onChangeText={text => {
                      setFirstName(text);
                      if (errors.firstName)
                        setErrors(prev => ({ ...prev, firstName: undefined }));
                    }}
                    style={[
                      styles.input,
                      {
                        borderWidth: 1,
                        borderColor: errors.firstName
                          ? '#FF000080'
                          : Colors.borderColor,
                      },
                    ]}
                  />
                  {errors.firstName && (
                    <Text style={styles.errorMessage}>{errors.firstName}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Last Name *</Text>
                  <TextInput
                    placeholder={errors.lastName ? ' ' : 'Valentine'}
                    placeholderTextColor="#8391A1"
                    value={lastName}
                    onChangeText={text => {
                      setLastName(text);
                      if (errors.lastName)
                        setErrors(prev => ({ ...prev, lastName: undefined }));
                    }}
                    style={[
                      styles.input,
                      {
                        borderWidth: 1,
                        borderColor: errors.lastName
                          ? '#FF000080'
                          : Colors.borderColor,
                      },
                    ]}
                  />
                  {errors.lastName && (
                    <Text style={styles.errorMessage}>{errors.lastName}</Text>
                  )}
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>DOB (mm/dd/yyyy) *</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    activeOpacity={0.8}
                  >
                    <TextInput
                      editable={false}
                      placeholder={errors.dob ? '' : '02/14/2024'}
                      placeholderTextColor="#8391A1"
                      value={dob}
                      style={[
                        styles.input,
                        {
                          borderWidth: 1,
                          borderColor: errors.lastName
                            ? '#FF000080'
                            : Colors.borderColor,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  {errors.dob && (
                    <Text style={styles.errorMessage}>{errors.dob}</Text>
                  )}
                  {showDatePicker && (
                    <DateTimePicker
                      value={dobDate || new Date()}
                      mode="date"
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                <View style={styles.switchContainer}>
                  <TouchableOpacity
                    onPress={() => setIsContractor(!isContractor)}
                    style={[
                      styles.contractor,
                      {
                        backgroundColor: isContractor
                          ? Colors.primary
                          : 'transparent',
                        borderColor: Colors.primary,
                        borderWidth: isContractor ? 0 : 1,
                      },
                    ]}
                  >
                    {isContractor && (
                      <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.contractorText}>
                    Are you a contractor?
                  </Text>
                </View>
                {!hasRequiredErrors && (
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>
                      What is your project address?
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Morton Campus, Tauton, MA"
                      placeholderTextColor="#8391A1"
                      value={address}
                      onChangeText={setAddress}
                    />
                  </View>
                )}

                <LinearGradient
                  colors={[Colors.gradientStart, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0, 0.85]}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                  >
                    <Text style={styles.nextbuttonText}>Next</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default BasicInfo;
const styles = StyleSheet.create({
  backbtnContainer: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingBottom: 17,
    width: '100%',
  },
  backButton: {
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
  progressBarWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 6,
  },
  progress: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  incomplete: {
    flex: 1,
    backgroundColor: '#EEF0F3',
    marginLeft: 4,
  },
  innerContent: {
    width: '100%',
    maxWidth: 328,
    margin: 'auto',
    flexGrow: 1,
    paddingTop: 41,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    letterSpacing: -1,
    color: Colors.textDark,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    lineHeight: 22,
    color: Colors.textLight,
    marginBottom: 25,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    height: 44,
    fontSize: 16,
    color: '#8391A1',
    fontFamily: Fonts.medium,
    shadowColor: '#101922',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  errorMessage: {
    color: '#FB7C7D',
    marginTop: 4,
    fontSize: 10,
    fontFamily: Fonts.semiBold,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 3,
  },
  contractor: {
    width: 16,
    height: 16,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  contractorText: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
  nextButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  gradientButton: {
    marginTop: 60,
    marginBottom: 26,
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
  nextbuttonText: {
    fontSize: 16,
    color: Colors.backgroundColor,
    fontFamily: Fonts.semiBold,
  },
});
