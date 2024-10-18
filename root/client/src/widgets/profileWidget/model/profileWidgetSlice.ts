import { createSlice } from "@reduxjs/toolkit";

interface profileWidgetState {
    isProfileWidgetOpen: boolean
}

const initialState: profileWidgetState = {
    isProfileWidgetOpen: false
}

export const profileWidgetSlice = createSlice({
    name: 'profileWidget',
    initialState,
    reducers: {
        openProfileWidget(state ) {
           state.isProfileWidgetOpen = true
        },

        closeProfileWidget(state ) {
           state.isProfileWidgetOpen = false
        },
    },
})

const { actions, reducer } = profileWidgetSlice

export const { closeProfileWidget, openProfileWidget } = actions

export default reducer