import {createSlice} from '@reduxjs/toolkit';
import * as api from '../api';
import * as Keychain from 'react-native-keychain';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: async (state, action) => {
      try {
        const {data} = await api.addPost(action.payload);
        state.posts = [...posts, data];
      } catch (err) {
        console.log(err);
      }
    },
    deletePost: async (state, action) => {
      try {
        await api.deletePost(action.payload);
        state.posts = state.posts.filter(post => post.id != action.payload.id);
      } catch (err) {
        console.log(err);
      }
    },
    fetchPosts: async state => {
      try {
        const {data} = await api.fetchPosts(action.payload);
        state.posts = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const {addPost, deletePost, fetchPosts} = postsSlice.actions;

export default postsSlice.reducer;
