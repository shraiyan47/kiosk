import { createSlice } from '@reduxjs/toolkit'

export const userRoleSlice = createSlice({
  name: 'userRoles',
  initialState: {
    // value: 1,
    data: [],
    newdata: []
  },
  reducers: {
    userRolesList: (state = initialState, action) => {
      state.data = [...state.data, action.payload.data]
    }
  }
})

export const { userRolesList } = userRoleSlice.actions

export default userRoleSlice.reducer
