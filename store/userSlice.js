import {createSlice} from '@reduxjs/toolkit';
import * as api from '../api';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      try {
        
        state.username = JSON.stringify(action.payload.username);
        state.email = JSON.stringify(action.payload.email);
        state.token = JSON.stringify(action.payload.accessToken);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
