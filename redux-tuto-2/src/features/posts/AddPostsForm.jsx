import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { postAdded } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostsForm = () => {
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [userId, setUserId] = useState('');

	const users = useSelector(selectAllUsers);

	const onTitleChange = (e) => setTitle(e.target.value);

	const onContentChange = (e) => setContent(e.target.value);

	const onAuthChange = (e) => setUserId(e.target.value);

	const onPostSave = () => {
		if (title && content) {
			dispatch(postAdded(title, content, userId));
			setTitle('');
			setContent('');
		}
	};

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId); // Check if the form is valid with a boolean

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
};
 
export default AddPostsForm