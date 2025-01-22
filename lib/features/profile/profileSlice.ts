import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileInterface {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: ProfileInterface = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  email: "",
};

export const profileSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    addProfileData: (state, action:PayloadAction<{id?:string, firstName?:string,lastName?:string,username?:string,email?:string}>) => {
      const {id,username,firstName,lastName ,email} = action.payload;

      if (id) state.id = id;
      if (username) state.username = username;
      if (firstName) state.firstName = firstName;
      if (lastName) state.lastName = lastName;
      if (email) state.email = email;
    }
  },
});

export const { addProfileData } =
  profileSlice.actions;

export default profileSlice.reducer;

