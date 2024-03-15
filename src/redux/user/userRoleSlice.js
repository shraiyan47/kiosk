import { createSlice } from '@reduxjs/toolkit'

export const userRoleSlice = createSlice({
  name: 'userRoles',
  initialState: {
    // value: 1,
    data: [],
    shopData: [],
    newdata: []
  },
  reducers: {
    userRolesList: (state = initialState, action) => {
      state.data = [...state.data, action.payload.data]
    },
    shopNameList: (state = initialState, action) => {
      state.shopData = [...state.shopData, action.payload.shopData]
    },
    ClearShopName: (state = initialState) => {
      state.shopData = []
    }
  }
})

export const { userRolesList, shopNameList,ClearShopName } = userRoleSlice.actions

export default userRoleSlice.reducer
