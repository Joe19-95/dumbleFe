import { createSlice } from "@reduxjs/toolkit";

const connectSlice = createSlice({
    name: 'connect',
    initialState: [],
    reducers: {
        addConnection: (state, actions) => {
            return actions.payload
        },
        removeConnection: (state, action) => null
    }
})


export const { addConnection, removeConnection } = connectSlice.actions
export default connectSlice.reducer

