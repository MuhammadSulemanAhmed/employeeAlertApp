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
};

const ImageDialog: React.FC<Props> = ({ visible }) => {

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
                        <View style={styles.topContent}>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="chevron-back" size={12} color="#1E232C" />
                            </TouchableOpacity>

                            <Text style={styles.skipText}>Choose a method</Text>
                        </View>

                        <View style={styles.buttonWrapperr}>
                            <LinearGradient
                                colors={[Colors.gradientStart, Colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                locations={[0, 0.85]}
                                style={styles.gradientButton}
                            >
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Take a photo</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <View
                                style={styles.gradientButtonn}
                            >
                                <TouchableOpacity style={styles.buttonn}>
                                    <Text style={styles.buttonTextt}>Upload an image</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ImageDialog;

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
        height: 221,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 25,
        paddingHorizontal: 24,
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
    topContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 50,
        marginBottom: 40,
    },

    backBtn: {
        position: 'absolute',
        left: 0,
        width: 30,
        height: 30,
        borderRadius: 6,
        backgroundColor: Colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#101922',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },

    skipText: {
        fontSize: 16,
        color: '#2C2C2C',
        fontFamily: Fonts.semiBold,
        textAlign: 'center',
    },
    buttonWrapper: {
        marginBottom: 35,
    },
    buttonWrapperr: {
        marginBottom: 10,
    },
    gradientButton: {
        width: 261,
        height: 40,
        borderRadius: 8,
    },
    button: {

        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.backgroundColor,
        fontSize: 13,
        fontFamily: Fonts.semiBold,
        letterSpacing: 0,
    },
     gradientButtonn: {
        width: 261,
        height: 40,
    },
    buttonn: {
        borderRadius: 8,
        backgroundColor: '#E8ECF4',
        
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextt: {
        color: Colors.textDark,
        fontSize: 13,
        fontFamily: Fonts.medium,
        letterSpacing: 0,
    },

});


