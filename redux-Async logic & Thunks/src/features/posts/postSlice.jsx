import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
	posts: [],
	status: 'idle', // idle, loading, success, error
	error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const res = await axios.get(POST_URL);

	return res.data;
});

export const addNewPost = createAsyncThunk(
	'posts/AddNewPost',
	async (initialPost) => {
		const res = await axios.post(POST_URL, initialPost);
		return res.data;
	}
);

const postsSlices = createSlice({
	// createSlice is a function that takes an object as an argument
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				// action.payload = {id, title, content}
				state.posts.push(action.payload);
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
			const existingPost = state.posts.find((post) => post.id === postId); //find the post with the postId
			if (existingPost) {
				existingPost.reactions[reaction]++; //increment the reaction
			}
		},
	},
	extraReducers(builder) {
		// extraReducers work with the builder object
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				//wortk a bit liek a switch statement
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				//fulfilled is the name of the fulfilled case
				state.status = 'success';
				//Adding date and reactions to the posts
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumpsUp: 0,
						hooray: 0,
						heart: 0,
						rocket: 0,
						eyes: 0,
					};
					return post;
				});
				//Add any fetched posts to the array
				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'error';
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumpsUp: 0,
					hooray: 0,
					heart: 0,
					rocket: 0,
					eyes: 0,
				};
				console.log(action.payload);
				state.posts.push(action.payload);
			});
	},
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionsAdded } = postsSlices.actions;

export default postsSlices.reducer;
