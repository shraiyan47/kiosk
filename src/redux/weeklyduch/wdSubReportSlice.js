import { createSlice } from '@reduxjs/toolkit'

/////////////////////// WEEKLY DUCH SUBMISSION REPORT 

export const wdSubReportSlice = createSlice({
  name: 'wdSubReport',
  initialState: {
    // value: 1,
    wdSubData: [],
    wdSubWeeklyUserCount: [],
    wdSubOptReport: [],
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
      state.wdSubWeeklyUserCount = [...state.wdSubWeeklyUserCount, action.payload.wdSubWeeklyUserCount]
    }, 
    clearWeeklyWdSubUserCountList: (state = initialState) => {
      state.wdSubWeeklyUserCount = []
    },  
    wdSubOptionsReport: (state = initialState, action) => {
      state.wdSubOptReport = [...state.wdSubOptReport, action.payload.wdSubOptReport]
    }, 
    clearWdSubOptionsReport: (state = initialState) => {
      state.wdSubOptReport = []
    }, 
  }
})

export const { wdSubOptionsReport, clearWdSubOptionsReport, wdSubDataList , clearWdSubDataList, wdSubWeeklyUserCountList, clearWeeklyWdSubUserCountList } = wdSubReportSlice.actions

export default wdSubReportSlice.reducer