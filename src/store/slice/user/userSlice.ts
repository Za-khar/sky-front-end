import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUserInitialState } from './types'
import { TUser } from '@app/types'

const initialState: TUserInitialState = {
  user: null,
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logoutAction: () => initialState,
    setUserAction: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
    },
  },
})

export const userReduces = userSlice.reducer

export const userActions = userSlice.actions
