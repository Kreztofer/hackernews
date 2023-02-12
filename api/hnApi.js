import axios from 'axios';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const topStoriesUrl = `${baseUrl}topstories.json`;
export const storyUrl = `${baseUrl}item/`;

export const getStory = async (storyIds) => {
  const result = await Promise.all(
    storyIds?.map((id) =>
      axios.get(`${storyUrl + id}.json`).then(({ data }) => data)
    )
  );
};

export const getStoryIds = async () => {
  const result = await axios.get(topStoriesUrl).then(({ data }) => data);

  return result;
};
