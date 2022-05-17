import {useSelector, useDispatch} from 'react-redux'
import { selectAllPosts } from './postSlice'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButton from './ReactionsButton';

const PostsList = () => {
	const posts = useSelector(selectAllPosts);

	const orderedPost = posts
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date)); // Sort the posts by date

	const renderedPosts = orderedPost.map((post) => (
		<article key={post.id}>
			<h1>{post.title}</h1>
			<PostAuthor userId={post.userId} />
			<TimeAgo timestamp={post.date} />
			<p>{post.content.substring(0, 100)}</p>
			<ReactionsButton post={post} />
		</article>
	));

	return (
		<section>
			<h2>All Posts</h2>
			{renderedPosts}
		</section>
	);
};

export default PostsList