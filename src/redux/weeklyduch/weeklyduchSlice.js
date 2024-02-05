import { createSlice } from '@reduxjs/toolkit'

export const weeklyduchSlice = createSlice({
  name: 'weeklyduchs',
  initialState: {
    // value: 1,
    sectionAndOptions: [],
    currentWeek: [],
    newdata: []
  },
  reducers: {
    weeklyduchsList: (state = initialState, action) => {
      state.sectionAndOptions = [...state.sectionAndOptions, action.payload.sectionAndOptions]
    }, 
    clearWeeklyduchlist: (state = initialState) => {
      state.sectionAndOptions = []
    },
    CurrentWeekList: (state = initialState, action) => {
      state.currentWeek = [...state.currentWeek, action.payload.currentWeek]
    }, 
    clearCurrentWeeklist: (state = initialState) => {
      state.currentWeek = []
    }
  }
})

export const { weeklyduchsList , clearWeeklyduchlist, CurrentWeekList, clearCurrentWeeklist } = weeklyduchSlice.actions

export default weeklyduchSlice.reducer