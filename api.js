import axios from 'axios';

const api = axios.create({baseURL: 'http://10.0.2.2:3000'});

export const fetchPosts = data => {
  return api.get('/posts', {headers: {Authorization: `Bearer ${data.token}`}});
};
export const addPost = data => {
  return api.post('/posts', data, {
    headers: {Authorization: `Bearer ${data.token}`},
  });
};
export const deletePost = data => { 
  return api.delete(`/posts/${data.id}`, {
    headers: {Authorization: `Bearer ${data.token}`},
  });
};
export const logIn = data => {
  return api.post('/users/signin', data);
};
export const signUp = data => {
  return api.post('/users/signup', data);
};
