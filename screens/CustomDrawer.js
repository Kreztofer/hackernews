import { View, Text, Image } from 'react-native';
import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import bg from '../assets/bg.jpg';
import profile from '../assets/profile.png';

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
        className="absolute top-[270px] h-[60px] w-[60px] left-[10px]"
        source={profile}
      />

      <View className="mt-[60px] space-y-5 mx-3">
        <Text className="text-lg font-medium">My activities</Text>
        <Text className="text-lg font-medium">Recently viewed</Text>
        <Text className="text-lg font-medium">Favourites</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
