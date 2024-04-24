const ProgressBar = ({ bgColor, target, achieved }: any) => {
  let progress = (parseInt(achieved) / parseInt(target)) * 100;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 30,
  };

  const fillerStyles: any = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgColor,
    borderRadius: 'inherit',
    textAlign: 'right',
    maxWidth: '100%',
  };

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div className='progress-bar' style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{progress > 100 ? 100 : progress.toFixed(2)}%</span>
      </div>
    </div>
  );
};
export default ProgressBar;
