import { createSlice } from '@reduxjs/toolkit'

export const submissionSlice = createSlice({
  name: 'submissions',
  initialState: {
    // value: 1,
    sub: [],
    eleg: [],
    hachlata: [],
    gedermoment: [],
    newdata: []
  },
  reducers: {
    submissionsList: (state = initialState, action) => {
      state.sub = [...state.sub, action.payload.sub]
    },
    clearSubmissionsList: (state = initialState) => {
      state.sub = []
    },
    eligiblesList: (state = initialState, action) => {
      state.eleg = [...state.eleg, action.payload.eleg]
    },
    clearEligiblesList: (state = initialState) => {
      state.eleg = []
    },
    hachlatasList: (state = initialState, action) => {
      state.hachlata = [...state.hachlata, action.payload.hachlata]
    },
    clearhachlatasList: (state = initialState) => {
      state.hachlata = []
    },
    gedermomentsList: (state = initialState, action) => {
      state.gedermoment = [...state.gedermoment, action.payload.gedermoment]
    },
    cleargedermomentsList: (state = initialState) => {
      state.gedermoment = []
    }
  }
})

export const { submissionsList, clearSubmissionsList, eligiblesList, clearEligiblesList, hachlatasList, clearhachlatasList, gedermomentsList, cleargedermomentsList } = submissionSlice.actions

export default submissionSlice.reducer
