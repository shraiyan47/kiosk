import { createSlice } from '@reduxjs/toolkit'

/////////////////////// WEEKLY DUCH SUBMISSION REPORT 

export const wdSubReportSlice = createSlice({
  name: 'wdSubReport',
  initialState: {
    // value: 1,
    wdSubData: [],
    newdata: []
  },
  reducers: {
    wdSubDataList: (state = initialState, action) => {
      state.wdSubData = [...state.wdSubData, action.payload.wdSubData]
    }, 
    clearWdSubDataList: (state = initialState) => {
      state.wdSubData = []
    }, 
    wdSubWeeklyUserCountList: (state = initialState, action) => {
      state.wdSubData = [...state.wdSubData, action.payload.wdSubData]
    }, 
    clearWeeklyWdSubUserCountList: (state = initialState) => {
      state.wdSubData = []
    },  
  }
})

export const { wdSubDataList , clearWdSubDataList, wdSubWeeklyUserCountList, clearWeeklyWdSubUserCountList } = wdSubReportSlice.actions

export default wdSubReportSlice.reducer