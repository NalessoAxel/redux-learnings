import { useDispatch } from 'react-redux';

import { reactionsAdded } from './postSlice';

const reactionEmoji = {
	thumbsUp: '👍',
	heart: '❤️',
	rocket: '🚀',
	wow: '😮',
	coffee: '☕️',
};

const ReactionsButton = ({ post }) => {
	const dispatch = useDispatch();

	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		//object.entries() returns an array of arrays
		return (
			<button
				key={name}
				type="button"
				className="reactionButton"
				onClick={() =>
					dispatch(reactionsAdded({ postId: post.id, reaction: name }))
				}
			>
				{emoji}
				<span className="emojiName">{post.reactions[name]}</span>
			</button>
		);
	});
	return <div>{reactionButtons}</div>;
};

export default ReactionsButton;
