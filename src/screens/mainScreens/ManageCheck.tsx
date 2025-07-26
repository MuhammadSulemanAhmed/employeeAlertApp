
import React, { useState, useEffect } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../navigation/AccountStack';
import { AppStackParamList } from '../../navigation/AppStack';
import { AuthStackParamList } from '../../navigation/AuthStack';
const { width } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';


type CombinedParamList = AppStackParamList & AccountStackParamList & AuthStackParamList;
type NavigationProp = NativeStackNavigationProp<CombinedParamList>;

const ManageCheck = () => {

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
                        <Text style={styles.tittle}>Employee Alert Plan</Text>
                        <View style={styles.TopBox}>
                            <View style={styles.topBox}>
                                <Text style={styles.touchText}>Upgrade Plan</Text>
                            </View>
                            <View style={styles.bottomBox}>

                                <View style={styles.rowText}>
                                    <Text style={styles.boxText}>Unlimited Team Plan</Text>
                                    <View style={styles.smallBox}>
                                        <Text style={styles.smallBoxText}>$12/mo</Text>
                                    </View>
                                </View>
                                <Text style={styles.subtitle}>
                                    Alert to unlimited emergency contacts
                                    Share alert service with unlimited members
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.billing}>Billing Address</Text>
                        <View style={styles.billingbox}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.label}>Full Name on Credit/Debit Card *</Text>
                                <TextInput
                                    placeholder="Tuna"
                                    placeholderTextColor="#8391A1"
                                    style={styles.input}
                                />
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.label}>Address</Text>
                                <TextInput
                                    placeholder="Morton Campus, Tauton, MA"
                                    placeholderTextColor="#8391A1"
                                    style={styles.input}
                                />
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.label}>Zip Code</Text>
                                <TextInput
                                    placeholder="56000"
                                    placeholderTextColor="#8391A1"
                                    style={styles.input}
                                />
                            </View>
                        </View>
                        <Text style={styles.payment}>Payment Method</Text>
                        <View style={styles.mainBox}>
                            <View style={styles.rightContent}>
                                <Image
                                    source={require('../../../assets/images/paypall.png')} // replace with your image path
                                    style={styles.imageStyle}
                                    resizeMode="contain"
                                />
                                <Text style={styles.imageText}>Paypal</Text>
                            </View>
                            <View style={styles.circle} />
                        </View>
                        <View style={styles.mainBoxx}>
                            <View style={styles.rightContent}>
                                <Image
                                    source={require('../../../assets/images/debit.png')}
                                    style={styles.imageStyle}
                                    resizeMode="contain"
                                />
                                <Text style={styles.imageText}>Credit / Debit Card</Text>
                            </View>
                            <View style={styles.circle} />
                        </View>
                        <LinearGradient
                            colors={[Colors.gradientStart, Colors.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            locations={[0, 0.85]}
                            style={styles.gradientButton}
                        >
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tabs',{screen:'Account'})}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
export default ManageCheck;

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
        fontFamily: Fonts.semiBold,
        color: Colors.textDark,
        marginTop: 28,
        left: 10,
        lineHeight: 36,
    },
    TopBox: {
        marginTop: 39,
        width: 328,
        height: 122,
    },
    topBox: {
        alignSelf: 'flex-end',
        width: 133,
        height: 29,
        backgroundColor: Colors.gradientEnd,
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
    bottomBox: {
        paddingHorizontal: 24,
        paddingVertical: 15,
        borderRadius: 6,
        borderWidth: 1,
        width: 328,
        height: 99,
        borderColor: '#E8ECF4',
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
        borderColor: '#50CE76',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallBoxText: {
        color: '#50CE76',
        fontSize: 12,
        fontFamily: Fonts.semiBold
    },
    subtitle: {
        fontSize: 14,
        marginTop: 8,
        color: '#8391A1',
        lineHeight: 19,
    },
    billing: {
        marginTop: 28,
        fontFamily: Fonts.semiBold,
        fontSize: 18,
        color: Colors.textDark,
    },
    billingbox: {
        marginTop: 15,
        borderRadius: 6,
        borderWidth: 1,
        width: 328,
        height: 273,
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 12,
        borderColor: '#E8ECF4',
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.textDark,
        marginBottom: 5,
        lineHeight: 17.5,
    },
    input: {
        backgroundColor: '#F7F8F9',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        height: 44,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        color: '#8391A1',
        fontFamily: Fonts.medium,
        shadowColor: '#101922',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    payment: {
        fontFamily: Fonts.semiBold,
        fontSize: 18,
        marginTop: 28,
        color: Colors.textDark,
    },
    paymentMethod: {
        width: '100%',
        height: 51.04,
    },
    mainBox: {
        width: '100%',
        height: 51,
        maxWidth: 328,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        marginTop: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    mainBoxx: {
        width: '100%',
        height: 51,
        maxWidth: 328,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E8ECF4',
        marginTop: 20,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    circle: {
        width: 13,
        height: 14,
        borderRadius: '50%',
        borderColor: '#090F4740',
        marginLeft: 12,
        borderWidth: 1,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    imageText: {
        paddingLeft: 5,
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: Colors.textDark,
    },
    imageStyle: {
        width: 28.52,
        height: 27.04,
        borderRadius: 0.7,
    },
    gradientButton: {
        marginTop: 68,
        borderRadius: 8,
        maxWidth: 328,
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
