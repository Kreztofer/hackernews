import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const TopStoryCard = ({ imgUrl, title, author, storys }) => {
  console.log(storys);
  return (
    <TouchableOpacity className="relative mr-5">
      <Image
        source={{ uri: imgUrl }}
        className="h-[296px] w-[215px] rounded-[10px]"
      />
      <View className="h-[296px] w-[215px] rounded-[10px] bg-black opacity-[0.3] absolute" />
      <Text className="absolute text-white bottom-[62px] text-[14px] left-[14px] font-semibold">
        {author}
      </Text>
      <Text className="absolute text-white bottom-4 text-[16px] font-bold left-[14px]">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TopStoryCard;
