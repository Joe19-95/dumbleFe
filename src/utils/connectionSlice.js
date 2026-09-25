import { createSlice } from "@reduxjs/toolkit";

const connectSlice = createSlice({
    name: 'connect',
    initialState: null,
    reducers: {
        addConnection: (_, action) => action.payload,
        removeConnection: (state, action) =>
            state?.filter((connection) => connection._id !== action.payload) ?? null,
        removeAll: () => null
    }
})


export const { addConnection, removeConnection,removeAll } = connectSlice.actions
export default connectSlice.reducer

