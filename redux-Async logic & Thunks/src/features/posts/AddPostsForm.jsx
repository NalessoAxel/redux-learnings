import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostsForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');
	const [addRequestStatus, setAddRequestStatus] = useState('idle');

	const users = useSelector(selectAllUsers);

	const onTitleChange = (e) => setTitle(e.target.value);

	const onContentChange = (e) => setContent(e.target.value);

	const onAuthChange = (e) => setUserId(e.target.value);

	const canSave =
		[title, content, userId].every(Boolean) && addRequestStatus === 'idle'; // Check if the form is valid with a boolean

	const onPostSave = () => {
		if (canSave) {
			try {
				setAddRequestStatus('pending');

				dispatch(addNewPost({ title, body: content, userId })).unwrap(); // unwrap return a new promise that resolves to the result of the thunk

				setTitle('');
				setContent('');
				setUserId('');
			} catch (error) {
				console.error('Failed to save the post', error);
			} finally {
				setAddRequestStatus('idle');
			}
		}
	};

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	return (
		<section>
			<h2>Add a new post</h2>
			<form>
				<div className="form-control">
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						id="postTitle"
						placeholder="Title"
						value={title}
						onChange={onTitleChange}
					/>
					<label htmlFor="postAuthor">Author:</label>
					<select id="postAuthor" value={userId} onChange={onAuthChange}>
						<option value="">Select author</option>
						{usersOptions}
					</select>
					<label htmlFor="content">Content:</label>
					<textarea
						id="postContent"
						placeholder="Content"
						value={content}
						onChange={onContentChange}
					/>
					<button type="button" onClick={onPostSave} disabled={!canSave}>
						Add Post
					</button>
				</div>
			</form>
		</section>
	);
};;;
 
export default AddPostsForm