import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
	let timeAgo = '';

	if (timestamp) {
		const date = parseISO(timestamp); //create a date object from the ISO string
		const timePeriod = formatDistanceToNow(date); //format the date to a human readable string  (e.g. "2 days ago")
		timeAgo = `${timePeriod} ago`; //add the time period to the end of the string
	}

	return (
		<span title={timestamp} className="date">
			&nbsp; <i>{timeAgo}</i>
		</span>
	);
};

export default TimeAgo;
