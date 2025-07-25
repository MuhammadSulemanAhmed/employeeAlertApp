import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>
type Props = {
    visible: boolean;
      onClose: () => void;
};
const UpgradeDialog: React.FC<Props> = ({ visible , onClose }) => {
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
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View
                    style={[styles.dialogBox, { width: screenDimensions.width * 0.8 }]}
                >
                    <View style={styles.contact}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="chevron-back" size={19} color="#1E232C" />
                        </TouchableOpacity>
                        <View style={styles.detail}>
                            <Text style={styles.title}>Limit Reached Upgrade Plan</Text>
                            <Text style={styles.subtitle}>
                                <Text style={styles.bold}>Oops!</Text>
                                <Text style={styles.medium}> you have reached the limit of your current plan.</Text>
                            </Text>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <LinearGradient
                                colors={[Colors.gradientStart, Colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[0, 0.85]}
                                style={styles.gradientButton}
                            >
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Upgrade Plan</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default UpgradeDialog;
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#001206B5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogBox: {
        width: '100%',
        maxWidth: 309,
        height: 268.28,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingTop: 35,
        paddingHorizontal: 21,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },
    contact: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'center',
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
    detail: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 35,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.interSemiBold,
        color: '#2C2C2C',
    },
    subtitle: {
        width: 245,
        marginTop: 10,
        fontSize: 14,
        fontFamily: Fonts.interRegular,
        textAlign: 'center',
        lineHeight: 18,
        flexDirection: 'row',
    },
    bold: {
        fontFamily: Fonts.interSemiBold,
        fontSize: 14,
        color: Colors.textDark,
    },
    medium: {
        fontFamily: Fonts.interMedium,
        fontSize: 14,
        color: Colors.textLight,
    },
    buttonWrapper: {
        marginBottom: 35,
    },
    gradientButton: {
        width: 267.57,
        height: 44,
        borderRadius: 8,
    },
    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});