import { Dimensions } from 'react-native';
import blue from '../../../assets/Images/pins/blue.png'
import pink from '../../../assets/Images/pins/pink.png'

import cyan from '../../../assets/Images/pins/cyan.png'
import green from '../../../assets/Images/pins/green.png'
import orange from '../../../assets/Images/pins/orange.png'
import purple from '../../../assets/Images/pins/purple.png'
import red from '../../../assets/Images/pins/red.png'
import bluelight from '../../../assets/Images/pins/bluelight.png'
import CryptoJS from 'crypto-js';
import { useState } from 'react';

const key = CryptoJS.enc.Utf8.parse('4512631236589784');
const iv = CryptoJS.enc.Utf8.parse('4512631236589784');

export const encryptUsingAES256 = (encryptData) => {
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(encryptData), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return encrypted

}

export const decryptUsingAES256 = (decString) => {
  const decrypted = CryptoJS.AES.decrypt(decString, encryptData, {
    keySize: 128 / 8,
    result: result,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
}

// export const baseURL = 'http://192.168.1.106:1003/'
export const baseURL = 'https://www.att-fleet.com/api/'

export const pinImgs = [blue, green, red, cyan, orange, purple, pink, bluelight];

export const screenWidth = Dimensions.get('window').width;
export const height = Dimensions.get("window").height;

export const ManfiestDateformat = (startDate, endDate) => {
  const formattedEndDate = `${endDate.getDate()} ${endDate.toLocaleString("en-US", { month: "short" })} ${endDate.getFullYear()}`;
  const formattedStartDate = `${startDate.getDate()} ${startDate.toLocaleString("en-US", { month: "short" })} ${startDate.getFullYear()}`;
  return { formattedStartDate, formattedEndDate };
}

export const ManfiestDateformats = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
  return formattedDate;
}

export const getDynamicHeight = (input) => {
  let responsiveHeigt = Math.round(height - ((height / input) * 100))
  return responsiveHeigt
}

export const screenfontSize = (value) => {
  return Math.min(screenWidth, height) * value;
}

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

