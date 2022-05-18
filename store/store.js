import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postReducer from './postsSlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})