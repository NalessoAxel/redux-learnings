import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {
	selectAllPosts,
	getPostsError,
	getPostsStatus,
	fetchPosts,
} from './postSlice';

import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);

	useEffect(() => {
		if (postsStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [dispatch, postsStatus]);

	let content;

	if (postsStatus === 'loading') {
		content = <p>Loading...</p>;
	} else if (postsStatus === 'success') {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => b.date.localeCompare(a.date));
		content = orderedPosts.map((post) => (
			<PostsExcerpt key={post.id} post={post} />
		));
	} else if (postsStatus === 'failed') {
		content = <p>{error}</p>;
	}

	return (
		<section>
			<h2>All Posts</h2>
			{content}
		</section>
	);
};

export default PostsList