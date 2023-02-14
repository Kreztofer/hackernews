import { View, Text, Image } from 'react-native';
import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import bg from '../assets/bg.jpg';
import profile from '../assets/profile.jpg';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        height: '100%',
        position: 'relative',
      }}
    >
      <Image className="h-[250px] object-contain w-[100%]" source={bg} />
      <Image
        className="absolute rounded-full top-[225px] h-[60px] w-[60px] left-[10px]"
        source={profile}
      />

      <View className="mt-[70px] space-y-5 mx-3">
        <Text className="text-base">
          <Text className="text-[#0047c5] font-medium">Name: </Text>
          Amalu U. Dominic
        </Text>
        <View>
          <Text className="text-base">
            <Text className="text-[#0047c5] font-medium">Title: </Text>
            Frontend web and mobile developer
          </Text>
        </View>
        <Text className="text-base">
          <Text className="font-medium text-[#0047C5]">Phone: </Text>
          07053144976
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
