import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import login from '../assets/login.png';
import * as SQLite from 'expo-sqlite';

const SignIn = () => {
  const navigation = useNavigation();
  const db = SQLite.openDatabase('LoginDatabase.db');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginDetails, setloginDetails] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM user_login', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setloginDetails(temp);
      });
    });
  }, []);

  const alertHandler = () => {
    alert('username and password must be above 5 characters');
  };
  const loginHandler = () => {
    let userNameArr = [];
    let userPassArr = [];
    loginDetails.map((item) => {
      userNameArr.push(item.user_name.trim());
      userPassArr.push(item.user_password.trim());
      if (userNameArr.includes(userName) && userPassArr.includes(password)) {
        navigation.navigate('Home');
      } else {
        setLoginError('User not found please create an account');
      }
    });
  };

  const SignInButton = () => {
    return (
      <View>
        {userName.length >= 5 && password.length >= 5 ? (
          <TouchableOpacity onPress={loginHandler}>
            <Text className="bg-[#1435A0] py-[15px] text-center text-white w-[350px] rounded-2xl m-auto">
              Sign in
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="space-y-7">
            <TouchableOpacity onPress={alertHandler}>
              <Text className="bg-[#1878F4] opacity-[0.8] py-[15px] text-center text-white w-[350px] rounded-2xl m-auto">
                Sign in
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
        <View className="absolute top-[120px] left-[100px] space-y-9">
          <Text className="text-[#0047C5] font-semibold text-[28px]">
            Login to account
          </Text>
          <Text className="text-center font-semibold text-lg">
            Welcome back!
          </Text>
        </View>
        <View className="absolute bottom-10 left-[30px]">
          <TextInput
            placeholder="Username"
            className="border border-1 mb-10 border-[#DADADA] px-[15px] w-[350px] rounded-2xl py-2"
            onChangeText={(value) => setUserName(value)}
          />
          <TextInput
            className="border border-1 border-[#DADADA] px-[15px] w-[350px] rounded-2xl py-2"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
          />
          <Text className="text-[#F6C136]">{loginError}</Text>
        </View>
      </View>
      <View className="items-center space-y-11">
        {<SignInButton />}
        <View className="flex flex-row">
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-[#1435A0]">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
