import React, { useState, useEffect } from 'react';
const { width } = Dimensions.get('window');
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import { ContactStackParamList  } from '../../navigation/ContactStack';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../constants/Fonts';

type CombinedParamList = AppStackParamList & ContactStackParamList;
type NavigationProp = NativeStackNavigationProp<CombinedParamList>;

const ContactMain = () => {
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
  const fakeData = [
    { id: '1', name: 'Tuna Valentine', message: 'Alert', category: 'Yourself' },
    { id: '2', name: 'Jeff Garber', message: 'No Alert', category: 'Engineer' },
    {
      id: '3',
      name: 'Elleen Wu',
      message: 'No Alert',
      category: 'Project Manager',
    },
  ];

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
                    <Text style={styles.title}>Contacts</Text>
                    <View style={styles.segmentWrapper}>
                        <TouchableOpacity style={styles.activeSegment}>
                            <Text style={styles.activeText}>Monitored</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inactiveSegment}
                          onPress={() => navigation.navigate('EmergencyContact')}>
                            <Text style={styles.inactiveText}>Emergency</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.monitoredRow}>
                        <Text style={styles.monitoredLabel}>Monitored</Text>
                        <TouchableOpacity style={styles.iconButton}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="person" style={styles.icon} />
                                <Text style={styles.iconText} onPress={() => navigation.navigate('ScanQrCode')}>Add</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.memberCount}>3 members</Text>
                    <View style={styles.alertBox}>
                        {fakeData.map((item, index) => (
                            <View key={item.id} style={[
                                styles.alertItem,
                                index !== fakeData.length - 1 && styles.alertItemBorder
                            ]}>
                                <View style={styles.alertTextGroup}>
                                    <View>
                                        <Text style={styles.alertName}>{item.name}</Text>
                                        <Text style={styles.alertCategory}>{item.category}</Text>
                                    </View>
                                    {item.message === 'Alert' ? (
                                        <View style={styles.alertIconRow}>
                                            <Text style={[styles.alertMsg, { color: '#FF3F3F', marginRight: 4 }]}>Alert</Text>
                                            <Ionicons name="notifications" size={16} color="#FF0000" />
                                        </View>
                                    ) : (
                                        <Text style={[styles.alertMsg, { color: '#00A86B' }]}>{item.message}</Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
  );
};

export default ContactMain;

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
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.semiBold,
        color: Colors.textDark,
        marginBottom: 36,
    },
    segmentWrapper: {
        width: 328,
        height: 40,
        borderRadius: 62,
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
    },
    activeSegment: {
        width: 164,
        height: 40,
        borderRadius: 62,
        backgroundColor: Colors.gradientStart,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveSegment: {
        width: 164,
        height: 40,
        borderRadius: 62,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeText: {
        fontSize: 14,
        fontFamily: Fonts.poppinsMedium,
        letterSpacing: 0,
        color: Colors.backgroundColor,
    },
    inactiveText: {
        fontFamily: Fonts.poppinsMedium,
        fontSize: 14,
        color: Colors.textDark,
    },
    monitoredRow: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 328,
    },
    monitoredLabel: {
        fontSize: 18,
        marginBottom: 2,
        fontFamily: Fonts.semiBold,
        color: Colors.textDark,
    },
    iconButton: {
        width: 64,
        height: 24,
        backgroundColor: Colors.gradientStart,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 14,
        color: Colors.backgroundColor
    },
    iconText: {
        fontSize: 14,
        left: 2,
        color: Colors.backgroundColor,
    },
    memberCount: {
        marginTop: 2,
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: Colors.textLight,
        lineHeight: 16,
    },
    alertBox: {
        width: 328,
        height: 218,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        borderRadius: 8,
        marginTop: 7,
        backgroundColor: Colors.backgroundColor,
        shadowColor: '#101922',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    alertItem: {
        width: 296,
        height: 66,
        justifyContent: 'center',
        paddingVertical: 4,
        alignSelf: 'center'
    },
    alertItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    alertName: {
        fontSize: 14,
        fontFamily: Fonts.medium,
    },
    alertMsg: {
        fontSize: 14,
        color: '#000',
        textAlign: 'right',
        maxWidth: 180,
    },
    alertCategory: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        marginBottom: 2,
        color: '#CCCCCC',
    },
    alertIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    alertTextGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 3,
        paddingRight: 3,
    },
});