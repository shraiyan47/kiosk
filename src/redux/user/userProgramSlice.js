import { createSlice } from '@reduxjs/toolkit'

export const userProgramSlice = createSlice({
  name: 'userPrograms',
  initialState: {
    // value: 1,
    programData: [],
    userData: [],
    newdata: []
  },
  reducers: {
    userProgramsList: (state = initialState, action) => {
      state.programData = [...state.programData, action.payload.programData]
    },
    userAllList: (state = initialState, action) => {
      state.userData = [...state.userData, action.payload.userData]
    }
  }
})

export const { userProgramsList, userAllList } = userProgramSlice.actions

export default userProgramSlice.reducer