import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo2.png';
import profile from '../assets/profile.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ props }) => {
  const navigation = useNavigation();
  const [storys, setStorys] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [currentPage, setcurrentPage] = useState();

  // Api Call
  useEffect(() => {
    if (AsyncStorage.getItem('stories')) {
      const getStoryList = async () => {
        try {
          setStorys(JSON.parse(await AsyncStorage.getItem('story')));
        } catch (err) {
          console.log(err);
        }
      };
      getStoryList();
    } else {
      const getStoryIds = async () => {
        try {
          await axios
            .get(
              'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
            )
            .then(({ data }) => {
              setStoryIds(data);
            });
        } catch (err) {
          console.log(err);
        }
      };

      const getTopStories = async () => {
        try {
          let arr = [];
          await Promise.all(
            storyIds?.map((id) =>
              axios
                .get(
                  `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
                )
                .then(({ data }) => {
                  arr.push(data);
                  AsyncStorage.setItem('story', JSON.stringify(arr));
                })
            )
          );
        } catch (error) {
          console.log(error);
        }
      };

      const getStoryList = async () => {
        try {
          setStorys(JSON.parse(await AsyncStorage.getItem('story')));
        } catch (err) {
          console.log(err);
        }
      };
      getStoryList();
      getTopStories();
      getStoryIds();
    }
  }, [storyIds]);

  const topstories = storys.splice(0, 10);

  const header = () => {
    return (
      <View className="flex flex-row justify-between items-center mx-4 pt-[40px]">
        <Text className="text-[20px] font-semibold">Top Stories</Text>
      </View>
    );
  };

  const loadMoreItem = () => {};

  const renderLoader = () => {
    return (
      <View className="my-4 items-center">
        <ActivityIndicator size="large" color="#0047C5" />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View className="px-4">
        <TouchableOpacity className="w-full my-3 border-solid border-[1px] rounded-[10px] border-[#dadada]">
          <View className="flex my-[28px] mx-3 space-y-2">
            <Text className="text-[#0047C5] text-base font-semibold">
              {item.title}
            </Text>
            <Text className="text-[12px]">{item.url}</Text>
            <Text className="text-[#AEA8A8]">By: {item.by}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white pt-[60px] h-[100%]">
      {/* Header */}
      <View className="border-b border-[#dadada]">
        <View className="flex pb-3 flex-row items-center justify-between mx-4 ">
          <TouchableOpacity>
            <Image source={logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={profile} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Stories */}
      <FlatList
        ListHeaderComponent={header}
        data={topstories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
