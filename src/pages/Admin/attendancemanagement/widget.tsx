/**
 * eslint-disable react/no-array-index-key
 *
 * @format
 */

/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { UserCards } from './UserCards';
import TodayAttendance from '../../../assets/svg/TodayAttendance.svg';
import NonAttendance from '../../../assets/svg/NonAttendance.svg';
import TotalUsers from '../../../assets/svg/TotalUsers.svg';

const cardData = [
  {
    icon: TotalUsers,
    color: '#FFF8DD',
    title: 'Total Users',
    fontColor: '#000000',
    borderColor: '#FF884D',
  },
  {
    title: `Today's Attendance`,
    icon: TodayAttendance,
    color: '#EBFFF6',
    fontColor: '#000000',
    borderColor: '#50CD89',
  },
  {
    title: 'Non Attendance',
    icon: NonAttendance,
    color: '#ede7f6',
    fontColor: '#000000',
    borderColor: '#F1416C',
  },
];
const Box1 = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  alignSelf: 'center',
});

const Box2 = styled(Box)({
  cursor: 'pointer',
});

function Widget() {
  const [choice, setChoice] = useState(cardData[1].title);

  return (
    <div>
      <Grid container justifyContent='space-around'>
        {cardData.map(
          ({ title, icon, color, fontColor, borderColor }, index) => (
            <Box1 key={index}>
              <Box2 onClick={(_e) => setChoice(title)}>
                <UserCards
                  title={title}
                  icon={icon}
                  color={color}
                  choice={choice}
                  fontColor={fontColor}
                  borderColor={borderColor}
                />
              </Box2>
            </Box1>
          )
        )}
      </Grid>
      {/* </Paper> */}
    </div>
  );
}
export default Widget;
