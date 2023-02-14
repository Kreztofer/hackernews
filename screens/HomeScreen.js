import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo2.png';
import profile from '../assets/profile.jpg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [storys, setStorys] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [currentPage, setcurrentPage] = useState(10);
  const [topstories, setTopstories] = useState([]);
  const [offset, setoffset] = useState(1);

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

  const header = () => {
    return (
      <View className="flex flex-row justify-between items-center mx-4 pt-[40px]">
        <Text className="text-[20px] font-semibold">Top Stories</Text>
      </View>
    );
  };

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

  const windowSize = storys.length > 50 ? storys.length / 4 : 21;
  let num = 30;
  let initialLoadNumber = 20;

  useEffect(() => {
    if (topstories.length < storys.length) {
      if (offset == 1) {
        setTopstories(storys.slice(0, offset * initialLoadNumber));
      }
    }
  }, [storys]);

  const getData = () => {
    if (topstories.length < storys.length && storys.length != 0) {
      setoffset(offset + 1);
      setTopstories(storys.slice(0, offset * num));
    }
  };

  return (
    <SafeAreaView className="bg-white pt-[40px] h-[100%]">
      {/* Header */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View className="border-b border-[#dadada]">
        <View className="flex pb-3 flex-row items-center justify-between mx-4 ">
          <TouchableOpacity>
            <Image source={logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              className="rounded-full h-[50px] w-[50px]"
              source={profile}
            />
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
        onEndReached={getData}
        onEndReachedThreshold={
          offset < 10 ? offset * (offset == 1 ? 2 : 2) : 20
        }
        windowSize={windowSize}
        maxToRenderPerBatch={num}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={num / 2}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
