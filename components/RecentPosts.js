import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import RecentPostCard from './RecentPostCard';

const RecentPosts = ({ stories }) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 30 }}
    >
      {/* story card */}
      {stories?.map((story) => (
        <RecentPostCard
          key={story?.id}
          url={story?.url}
          title={story?.title}
          author={story?.by}
        />
      ))}
    </ScrollView>
  );
};

export default RecentPosts;
