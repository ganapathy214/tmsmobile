import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity, ScrollView
} from 'react-native';
import TextField from '../../Common/Components/TextField'
import LinearGradient from 'react-native-linear-gradient';
import { commonStyle, primaryColor, secondaryColor } from '../../Common/Styles/index';
import { styles } from './styles';
import * as componStyle from "../../Common/Styles/index";
import { useDispatch } from 'react-redux';
import { changePasswordAction } from '../../services/session/sessionAction';
import { encryptUsingAES256, decryptUsingAES256 } from "../../Common/Utils";
// import { ScrollView } from 'react-native-gesture-handler';

export default function ChangePassword(props) {
    const dispatch = useDispatch()
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [oldPasswordtext, setoldPasswordtext] = useState("");
    const [newPasswordtext, setnewPasswordtext] = useState("");
    const [confirmPasswordtext, setconfirmPasswordtext] = useState("");

    const [changeoldPassword, setchangeoldPassword] = useState(false);
    const [changenewPassword, setchangenewPassword] = useState(false);
    const [changeconfirmPassword, setchangeconfirmPassword] = useState(false);

    const passRegex = new RegExp("^.*(?=.{8,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$");
    useEffect(() => {
        setchangeoldPassword(false)
        setchangenewPassword(false)
        setchangeconfirmPassword(false)
    }, [])


    const changePassword = () => {
        if (oldPassword === "" && newPassword === "" && confirmPassword === "") {
            setchangeoldPassword(true);
            setchangenewPassword(true);
            setchangeconfirmPassword(true);
            setoldPasswordtext(`Please enter the old password`);
            setnewPasswordtext(`Please enter the new password`);
            setconfirmPasswordtext(`Please enter the confirm password`)

        } else if (oldPassword === "") {
            setchangeoldPassword(true);
            setoldPasswordtext(`Please enter the old password`);
            return false;
        } else if (newPassword === "") {
            setchangenewPassword(true);
            setnewPasswordtext(`Please enter the new password`);
            return false;
        }
        else if (newPassword.length < 8 || newPassword.length > 20) {
            setchangenewPassword(true);
            setnewPasswordtext(`Password must be between 8 and 20 characters`);
        }
        else if (!newPassword.match(passRegex)) {
            setchangenewPassword(true);
            setnewPasswordtext(`Please enter the valid format`);
        }
        else if (confirmPassword === "") {
            setchangeconfirmPassword(true);
            setconfirmPasswordtext(`Please enter the confirm password`);
            return false;
        }
        else if (oldPassword === newPassword) {
            setchangenewPassword(true);
            setnewPasswordtext(`Old and new password are same`);
            return false;
        }
        else if (newPassword !== confirmPassword) {
            setchangeconfirmPassword(true);
            setconfirmPasswordtext(`New and confirm password are not same`);
            return false;
        }
        else {
            setoldPassword("");
            setnewPassword("");
            setconfirmPassword("")
            setoldPasswordtext("");
            setnewPasswordtext("");
            setconfirmPasswordtext("");
            const encryptedoldPassword = encryptUsingAES256(oldPassword)
            const encryptednewPassword = encryptUsingAES256(newPassword)
            dispatch(changePasswordAction(encryptedoldPassword, encryptednewPassword));
        }
    }

    const onChangeOldPassword = (data) => {
        setoldPassword(data);
        setchangeoldPassword(false);
        setconfirmPasswordtext();
        setnewPasswordtext();
    }
    const onChangeNewPassword = (data) => {
        setnewPassword(data);
        setchangenewPassword(false);
        setconfirmPasswordtext();
        setnewPasswordtext();
    }
    const onChangeConfirmPassword = (data) => {
        setconfirmPassword(data);
        setchangeconfirmPassword(false);
        setconfirmPasswordtext();
        setnewPasswordtext();
    }



    return (
        <View style={styles.container} >
            <ScrollView style={styles.content}>
                <View style={styles.height35} />
                <>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.noteHeader}>{'Notes : '}</Text>
                        <Text style={styles.notes}>{`Your password must be between 8-20 characters and contain an uppercase letter, a lowercase letter, a number, a special character.`}</Text>
                    </View>
                    <View style={[styles.fieldWrapper]} >
                        <TextField label={"Old Password"} errorMessage={oldPasswordtext} validation={changeoldPassword} text="Old Password" onChangeText={(data) => onChangeOldPassword(data)} isPassword={true} value={oldPassword} />

                        <TextField label={"New Password"} errorMessage={newPasswordtext} validation={changenewPassword} text="New Password" onChangeText={(data) => onChangeNewPassword(data)} isPassword={true} value={newPassword} />

                        <TextField label={"Confirm Password"} errorMessage={confirmPasswordtext} validation={changeconfirmPassword} text="Confirm Password" onChangeText={(data) => onChangeConfirmPassword(data)} isPassword={true} value={confirmPassword} />
                    </View>
                    <View style={styles.height35} />

                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => changePassword()}
                            style={[
                                styles.updateButton,
                                { backgroundColor: componStyle.primaryColor, alignContent: "center", alignItems: "center" },
                            ]}
                        >
                            <Text style={styles.btnText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.height35} />
                </>
            </ScrollView>
        </View>
    )
}