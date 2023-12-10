import { createSlice } from '@reduxjs/toolkit'

export const userProgramSlice = createSlice({
  name: 'userPrograms',
  initialState: {
    // value: 1,
    programData: [],
    newdata: []
  },
  reducers: {
    userProgramsList: (state = initialState, action) => {
      state.programData = [...state.programData, action.payload.programData]
    }
  }
})

export const { userProgramsList } = userProgramSlice.actions

export default userProgramSlice.reducer