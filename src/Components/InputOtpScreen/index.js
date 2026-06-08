import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Bgutils from '../../Common/Components/Backgroundutils'
import Toast from 'react-native-simple-toast';
import TextField from '../../Common/Components/TextField';
import * as componStyle from '../../Common/Styles/index';
import { styles } from './style';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import deliveryTruck from "../../../assets/Images/delivery-truck.png";
import { InputOtpScreens, updatePassword } from "../../services/session/sessionAction";
import { useDispatch, useSelector } from "react-redux";
import { encryptUsingAES256 } from "../../Common/Utils";

function InputOtpScreen(props) {

    const dispatch = useDispatch()
    const [otppassword, setOtppassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [otppasswordError, setOtppasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const selector = useSelector(state => state.session.userId.data)

    const [otpVerified, setOtpVerified] = useState(false);
    const [otpReset, setOtpReset] = useState(false);
    const [ApiReset, setApiReset] = useState("");

    const passRegex = new RegExp("^.*(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$");

    const validateOtp = async () => {
        try {
            if (otppassword.length === 6) {
                const InputOtp = await dispatch(InputOtpScreens(selector, otppassword));
                setOtpReset(false);
                if (InputOtp.data.message === "Code Matched Successfully") {
                    Toast.show('OTP Login is Successfully');
                    setOtpVerified(true);
                }
            } else {
                setOtpVerified(false);

                setOtppasswordError('Please enter a 6-digit OTP');
            }
        } catch (error) {
            setOtppasswordError('Invalid OTP. Please try again.');
            setOtpReset(true);
            console.error("Error occurred during OTP validation:", error);
        }
    };
    const resetOtp = () => {
        setOtppassword('');
        setOtpReset(false);
        setNewPassword('');
        setConfirmPassword('');
        setOtppasswordError('');
        setNewPasswordError('');
        setConfirmPasswordError('');
        setOtpVerified(false);
    };

    const resendOtpAction = async () => { try { await dispatch(InputOtpScreens(selector, otppassword)); setOtppassword(''); setOtpReset(false); setNewPassword(''); setConfirmPassword(''); setOtppasswordError(''); setNewPasswordError(''); setConfirmPasswordError(''); setOtpVerified(false); } catch (error) { console.error("Error occurred during OTP resend:", error); } };


    const handleCodeEntered = (data) => {
        setOtppassword(data);
        setOtppasswordError('');
    };

    const onChangeNewPassword = (data) => {
        setNewPassword(data);
        setNewPasswordError('');
    };

    const onChangeConfirmPassword = (data) => {
        setConfirmPassword(data);
        setConfirmPasswordError('');
    };

    const validateForm = () => {
        let isValid = true;
        if (!newPassword) {
            setNewPasswordError('Please enter the new password');
            isValid = false;
        }
        else if (newPassword.length < 8 || newPassword.length > 20) {
            setNewPasswordError(`Password must be between 8 and 20 characters`);
            isValid = false;
        }
        else if (!newPassword.match(passRegex)) {
            setNewPasswordError(`Please enter the valid format`);
            isValid = false;
        }
        else if (!confirmPassword) {
            setConfirmPasswordError('Please enter the confirm password');
            isValid = false;
        }
        else if (newPassword !== confirmPassword) {
            setConfirmPasswordError('New and confirm passwords do not match');
            isValid = false;
        }

        else if (newPassword === confirmPassword) {

            let newPasswordd = encryptUsingAES256(newPassword)
            dispatch(updatePassword(newPasswordd));
            setConfirmPasswordError('New and confirm passwords match');
            props.navigation.navigate('login');
        }
        return isValid;
    };

    const changePassword = () => {
        if (validateForm()) {
            Toast.show('Password updated successfully', Toast.LONG);
            setOtppassword('');
            setNewPassword('');
            setConfirmPassword('');
            setOtppasswordError('');
            setNewPasswordError('');
            setConfirmPasswordError('');
        }

    };
    return (
        <Bgutils>
            <View>
                <>
                    {!otpVerified ? (
                        <View style={styles.pinStyle}>
                            <Text style={styles.textBold}>{!otpVerified ? "Enter the OTP, sent via mail" : "Enter the new passsword"}</Text>
                            <SmoothPinCodeInput
                                mask={<Text style={{ color: 'black' }}>{"*"}</Text>}
                                autoFocus={true}
                                maskDelay={1000}
                                password={true}
                                cellStyle={{
                                    width: 42,
                                    borderRadius: 10,
                                    backgroundColor: otppasswordError ? '#FFC1C1' : 'white',
                                    borderWidth: 2,
                                    borderColor: '#d8d8d8',
                                }}
                                cellSpacing={14}
                                codeLength={6}
                                cellStyleFocused={null}
                                value={otppassword}
                                onFulfill={handleCodeEntered}
                                onTextChange={handleCodeEntered}
                                textStyle={{ fontSize: 20, color: 'black' }}
                            />
                            {otppasswordError ? (
                                <Text style={styles.otppasswordError}>
                                    {otppasswordError}
                                </Text>
                            ) : null}
                        </View>
                    ) : (
                        <>
                            <Text style={styles.textBold}>{!otpVerified ? "Enter the OTP, sent via mail" : "Enter the new passsword"}</Text>
                            <Text style={styles.notesWrapper}>{`Notes:\nYour password must be between 8-20 characters and contain an uppercase letter, a lowercase letter, a number, a special character.`}</Text>
                            <View style={styles.fieldWrapper}>
                                <TextField
                                    label={'New Password'}
                                    errorMessage={newPasswordError}
                                    validation={newPasswordError !== ''}
                                    text="New Password"
                                    onChangeText={onChangeNewPassword}
                                    value={newPassword}
                                    isPassword={true}

                                />
                                <TextField
                                    label={'Confirm Password'}
                                    errorMessage={confirmPasswordError}
                                    validation={confirmPasswordError !== ''}
                                    text="Confirm Password"
                                    onChangeText={onChangeConfirmPassword}
                                    value={confirmPassword}
                                    isPassword={true}
                                />
                            </View>
                        </>

                    )}
                </>
                <View style={componStyle.commonStyle['height-35']} />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={otpVerified ? changePassword : validateOtp}
                        style={[
                            styles.loginbutton,
                            { backgroundColor: componStyle.primaryColor, alignContent: 'center', alignItems: 'center' },
                        ]}
                    >

                        <Text style={{ ...styles.btnText }}>{otpVerified ? "Submit" : "Validate OTP"}</Text>
                    </TouchableOpacity>

                    <View style={{ height: 20 }} />

                    {!otpVerified && otpReset && (
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={resetOtp} style={styles.touchableSpace}>
                                <Text style={[styles.resetButtonText, { color: componStyle.primaryColor }]}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={resendOtpAction}>
                                <Text style={[styles.ResendText, { color: componStyle.primaryColor }]}>Resend OTP</Text>
                            </TouchableOpacity>
                        </View>)}
                </View>
            </View>
        </Bgutils>
    );
}

export default InputOtpScreen;