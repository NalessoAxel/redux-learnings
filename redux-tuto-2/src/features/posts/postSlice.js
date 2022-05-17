import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {id: 1, title: "Learning React Redux Toolkit", content: "I've heard a lot of good things about it!"},
    {id: 2, title: "Slices", content: "The more a say slices, the more i want pizza!"}
]

const postsSlices = createSlice({ // createSlice is a function that takes an object as an argument
    name: 'posts',
    initialState,
    reducers: {
        postAdded: (state, action) => { // action.payload = {id, title, content}
            state.push(action.payload)
        }
    }
})

export const selectAllPosts = (state) => state.posts // selectAllPosts is a function that takes a state as an argument

export const { postAdded } = postsSlices.actions // postAdded is a function that takes a state as an argument

export default postsSlices.reducer