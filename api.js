import axios from 'axios';

const api = axios.create({baseURL:"http://10.0.2.2:3000"});

export const fetchPosts = (token) => api.get("/posts",{}, {headers:{'Authorization':`Bearer ${token}`}});
export const addPost = (newPost) => api.post("/posts", newPost, {headers:{'Authorization':`Bearer ${token}`}}); 
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const login = (creds) => api.post("/users/signin", creds);
export const signup = (data) => api.post("/users/signup", data);