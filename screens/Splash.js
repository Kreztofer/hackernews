import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import logo from '../assets/logo1.png';
import splash2 from '../assets/head2.png';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const Splash = () => {
  const navigation = useNavigation();
  const db = SQLite.openDatabase('LoginDatabase.db');

  // Create login database
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user_login'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS user_login', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user_login(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_password VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView className="bg-[#130A3F] h-[100%] relative">
      <StatusBar backgroundColor="#130A3F" barStyle="light-content" />
      <Image source={splash2} />
      <View className="absolute bottom-[120px] left-[80px] items-center space-y-6">
        <Text className="text-white">WELCOME TO</Text>
        <Text className="text-[#98C5FF] font-semibold text-[28px]">
          HACKER NEWS
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className="bg-[#1435A0] py-[15px] text-center text-white w-[250px] rounded-[10px] m-auto">
            Get Started
          </Text>
        </TouchableOpacity>
        <Image source={logo} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
