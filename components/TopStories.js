import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import TopStoryCard from './TopStoryCard';

const TopStories = ({ stories }) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 36 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* card */}
      {stories?.map((story) => (
        <TopStoryCard
          key={story?.id}
          imgUrl={story?.url}
          title={story?.title}
          author={story?.by}
        />
      ))}
    </ScrollView>
  );
};

export default TopStories;
