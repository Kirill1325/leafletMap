import { createSlice } from "@reduxjs/toolkit";

interface friendsWidgetState {
    isFriendsWidgetOpen: boolean
}

const initialState: friendsWidgetState = {
    isFriendsWidgetOpen: false
}

export const friendsWidgetSlice = createSlice({
    name: 'friendsWidget',
    initialState,
    reducers: {
        openFriendsWidget(state ) {
           state.isFriendsWidgetOpen = true
        },

        closeFriendsWidget(state ) {
           state.isFriendsWidgetOpen = false
        },
    },
})

const { actions, reducer } = friendsWidgetSlice

export const { closeFriendsWidget, openFriendsWidget } = actions

export default reducer