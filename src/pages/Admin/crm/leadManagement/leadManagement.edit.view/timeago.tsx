
const TimeAgo = ({ updateTime }: { updateTime: number }) => {
  const createdTime = new Date().getTime();
  const timeDifferenceInMs = Math.abs(updateTime - createdTime);
  const seconds = timeDifferenceInMs / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = timeDifferenceInMs / (1000 * 60 * 60 * 24);

  if (seconds < 60) {
    return <span style={{ color: 'gray' }}>{Math.round(seconds)} seconds ago</span>;
  } else if (minutes < 60) {
    return <span style={{ color: 'gray' }}>{Math.round(minutes)} minutes ago</span>;
  } else if (hours < 24) {
    return <span style={{ color: 'gray' }}>{Math.round(hours)} hours ago</span>;
  } else if (hours >= 24) {
    return <span style={{ color: 'gray' }}>{Math.round(days)} days ago</span>;
  } else {
    return null;
  }
};

export default TimeAgo;
