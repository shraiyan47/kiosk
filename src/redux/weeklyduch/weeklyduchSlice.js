import { createSlice } from '@reduxjs/toolkit'

export const weeklyduchSlice = createSlice({
  name: 'weeklyduchs',
  initialState: {
    // value: 1,
    sectionAndOptions: [],
    newdata: []
  },
  reducers: {
    weeklyduchsList: (state = initialState, action) => {
      state.sectionAndOptions = [...state.sectionAndOptions, action.payload.sectionAndOptions]
    }, 
    clearWeeklyduchlist: (state = initialState) => {
      state.sectionAndOptions = []
    }
  }
})

export const { weeklyduchsList , clearWeeklyduchlist } = weeklyduchSlice.actions

export default weeklyduchSlice.reducer