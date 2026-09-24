import { createSlice } from '@reduxjs/toolkit'

const requestSlice = createSlice({
  name: 'requests',
  initialState: null,
  reducers: {
    addRequests: (_, action) => action.payload,
    removeRequest: (state, action) =>
      state.filter((request) => request._id !== action.payload),
    clearRequests: () => null,
  },
})

export const { addRequests, removeRequest, clearRequests } = requestSlice.actions
export default requestSlice.reducer
