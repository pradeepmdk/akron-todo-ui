import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    user: null,
}

  
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsloggedIn: (state, payload: PayloadAction<boolean>) => {
            state.isLoggedIn = payload.payload;
        },
        setUser: (state, payload: PayloadAction<any>) => {
            state.user = payload.payload;
        }
    }
})


export const { setIsloggedIn, setUser} = authSlice.actions

export default authSlice.reducer