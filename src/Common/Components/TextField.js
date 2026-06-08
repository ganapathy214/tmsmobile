import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { getDynamicHeight, screenfontSize } from '../Utils/index';
import Feather from 'react-native-vector-icons/Feather';

const TextField = ({ text, label, validation, errorMessage, isPassword, ...props }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <View>
      {label && <Text style={styles.label_text}>{label}</Text>}
      <View style={styles.input_container}>
        <TextInput
          style={styles.text_input}
          placeholder={text}
          placeholderTextColor="grey"
          selectionColor="black"
          secureTextEntry={isPassword && passwordVisible}
          autoFocus={false}
          {...props}
        />
        {isPassword && props.value && (
          <TouchableOpacity onPress={handlePasswordVisibility} style={styles.icon_container}>
            <Feather
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={17}
              color={passwordVisible ? 'black' : 'grey'}
            />
          </TouchableOpacity>
        )}
      </View>
      {validation && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  label_text: {
    fontSize: screenfontSize(0.04),
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'black',
    fontFamily: 'Avenir-Book',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Avenir-Book',
    marginBottom: 10
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    height: getDynamicHeight(46),
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  text_input: {
    flex: 1,
    fontSize: 14,
    padding: 10,
    paddingLeft: 20,
    color: 'black',
    fontFamily: 'Avenir-Book',
  },
  icon_container: {
    paddingRight: 10,
  },
});