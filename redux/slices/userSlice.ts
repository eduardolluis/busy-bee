import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  name: string | null;
  username: string | null;
  email: string | null;
  uid: string | null;
  photo: string | null;
};

const initialState: UserState = {
  name: null,
  username: null,
  email: null,
  uid: null,
  photo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photo = action.payload.photo;
    },
    clearUser: (state) => {
      state.name = null;
      state.username = null;
      state.email = null;
      state.uid = null;
      state.photo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
