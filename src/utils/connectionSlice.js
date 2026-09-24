import { createSlice } from "@reduxjs/toolkit";

const connectSlice = createSlice({
    name: 'connect',
    initialState: null,
    reducers: {
        addConnection: (_, action) => action.payload,
        removeConnection: () => null,
    }
})


export const { addConnection, removeConnection } = connectSlice.actions
export default connectSlice.reducer

