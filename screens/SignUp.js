import {
  View,
  Text,
  Alert,
  Button,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import login from '../assets/login.png';
import * as SQLite from 'expo-sqlite';

const SignUp = () => {
  const db = SQLite.openDatabase('LoginDatabase.db');
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const alertHandler = () => {
    alert('username and password must be above 5 characters');
  };

  const addInfo = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO user_login (user_name, user_password) VALUES (?,?)',
        [userName, password],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Account created Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('SignIn'),
                },
              ],
              {
                cancelable: false,
              }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  const SignUpButton = () => {
    return (
      <View>
        {userName.length >= 5 && password.length >= 5 ? (
          <TouchableOpacity onPress={addInfo}>
            <Text className="bg-[#1435A0] py-[15px] text-center text-white w-[350px] rounded-2xl m-auto">
              Sign up
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="space-y-7">
            <TouchableOpacity onPress={alertHandler}>
              <Text className="bg-[#1878F4] opacity-[0.8] py-[15px] text-center text-white w-[350px] rounded-2xl m-auto">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="bg-white h-[100%]">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View className="relative">
        <Image source={login} />
        <View className="absolute top-[120px] left-[90px] space-y-9">
          <Text className="text-[#0047C5] font-semibold text-[28px]">
            Create an account
          </Text>
          <Text className="text-center font-semibold text-lg">Join Us!</Text>
        </View>
        <View className="absolute bottom-10 left-[30px] space-y-10">
          <TextInput
            placeholder="Username"
            className="border border-1 border-[#DADADA] px-[15px] w-[350px] rounded-2xl py-2"
            onChangeText={(value) => setUserName(value)}
          />
          <TextInput
            className="border border-1 border-[#DADADA] px-[15px] w-[350px] rounded-2xl py-2"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
          />
        </View>
      </View>
      <View className="items-center space-y-11">
        {<SignUpButton />}
        <View className="flex flex-row">
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text className="text-[#1435A0]">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
