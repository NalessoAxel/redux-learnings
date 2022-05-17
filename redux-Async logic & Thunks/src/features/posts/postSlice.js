import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
	{
		id: 1,
		title: 'Learning React Redux Toolkit',
		content: "I've heard a lot of good things about it!",
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
	{
		id: 2,
		title: 'Slices',
		content: 'The more a say slices, the more i want pizza!',
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
];

const postsSlices = createSlice({
	// createSlice is a function that takes an object as an argument
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				// action.payload = {id, title, content}
				state.push(action.payload);
			},
			prepare(title, content, userId) {
				//prepare callback is used to prepare the action before it is dispatched
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumpsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
		reactionsAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.find((post) => post.id === postId); //find the post with the postId
			if (existingPost) {
				existingPost.reactions[reaction]++; //increment the reaction
			}
		},
	},
});

export const selectAllPosts = (state) => state.posts; // selectAllPosts is a function that takes a state as an argument

export const { postAdded, reactionsAdded } = postsSlices.actions; // postAdded is a function that takes a state as an argument

export default postsSlices.reducer;
