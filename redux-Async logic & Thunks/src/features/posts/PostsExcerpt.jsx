import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButton from './ReactionsButton';

const PostsExcerpt = ({ post }) => {
	return (
		<article>
			<h1>{post.title}</h1>
			<PostAuthor userId={post.userId} />
			<TimeAgo timestamp={post.date} />
			<p>{post.body.substring(0, 100)}</p>
			<ReactionsButton post={post} />
		</article>
	);
};

export default PostsExcerpt;
