import { createSlice } from '@reduxjs/toolkit'

const getLastSeen = () => {
  if (typeof window !== 'undefined') {
    const lastSeenJSON = localStorage.getItem('lastSeen')
    if (lastSeenJSON) return JSON.parse(lastSeenJSON)
  }

  return []
}

const token = localStorage.getItem('tin-cup-token') || ''

const initialState = {
    token,
    isLogged:false,
    lastSeen: getLastSeen()
   }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: state => {
      localStorage.removeItem('tin-cup-token')
      state.token = ''
      state.isLogged = false
    },

    userLogin: (state, action) => {
      localStorage.setItem('tin-cup-token', action.payload)
      state.token = action.payload
      state.isLogged = true
    },
   
    addToLastSeen: (state, action) => {
      let isItemExist = state.lastSeen.find(item => item.productID === action.payload.productID)

      if (!isItemExist) {
        if (state.lastSeen.length === 15) {
          state.lastSeen.splice(14, 1)
        }
        state.lastSeen.unshift(action.payload)
        localStorage.setItem('lastSeen', JSON.stringify(state.lastSeen))
      }
    },
  },
})

export const { userLogout, userLogin, addToLastSeen} = userSlice.actions

export default userSlice.reducer