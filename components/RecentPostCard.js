import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const RecentPostCard = ({ url, title, author }) => {
  return (
    <TouchableOpacity className="w-full my-3 border-solid border-[1px] rounded-[10px] border-[#dadada]">
      <View className="flex my-[28px] mx-3 space-y-2">
        <Text className="text-[#0047C5] text-base font-semibold">{title}</Text>
        <Text className="text-[12px]">{url}</Text>
        <Text className="text-[#AEA8A8]">By: {author}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecentPostCard;
