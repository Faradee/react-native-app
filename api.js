import axios from 'axios';

const api = axios.create({baseURL:"http://10.0.2.2:3000"});

export const fetchPosts = (data) => api.get("/posts",{}, {headers:{'Authorization':`Bearer ${data.token}`}});
export const addPost = (data) => api.post("/posts", newPost, {headers:{'Authorization':`Bearer ${data.token}`}}); 
export const deletePost = (data) => api.delete(`/posts/${data.id}`,{headers:{'Authorization':`Bearer ${data.token}`}});
export const logIn = (data) => api.post("/users/signin", data);
export const signUp = (data) => api.post("/users/signup", data);