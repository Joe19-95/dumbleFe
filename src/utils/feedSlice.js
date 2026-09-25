import { createSlice } from '@reduxjs/toolkit'

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (_, action) => action.payload,
    removeFeed: () => null,
    removeConnection: (state, action) => state.filter(k => k._id !== action.payload),
  },
})

export const { addFeed, removeFeed, removeConnection } = feedSlice.actions
export default feedSlice.reducer
