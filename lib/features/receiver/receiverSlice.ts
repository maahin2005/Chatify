import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReceiverS {
  userId: string;
  username: string;
}

const initialState: ReceiverS = {
  userId: "",
  username: "",
};

export const receiverSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    addReceiver: (state, action:PayloadAction<{userId?:string, username?:string}>) => {
      const {userId,username } = action.payload;

      if (userId) state.userId = userId;
      if (username) state.username = username;
    }
  },
});

export const { addReceiver } =
  receiverSlice.actions;

export default receiverSlice.reducer;