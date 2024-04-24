/** @format */

import { styled } from '@mui/styles';

import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

const StyledSpanColon = styled('span')({
  fontWeight: 600,
  marginRight: '15px',
  color: '#000000',
});
const StyledSpanSubject = styled('span')({
  display: 'inline-block',
  minWidth: 110,
  fontWeight: 600,
  color: '#424242  ',
});

const LabelWithValue = ({ subject, value }: any) => {
  return (
    <Typography>
      <CardActions>
        <StyledSpanSubject>{subject}</StyledSpanSubject>
        <StyledSpanColon>:</StyledSpanColon>
        {value}
      </CardActions>
    </Typography>
  );
};

export default LabelWithValue;
