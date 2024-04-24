/**
 * eslint-disable no-console
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Stack } from '@mui/system';

const MyPaper = styled(Paper)({
  padding: 8,
  height: '110px',
  borderRadius: '10px!important',
  cursor: 'pointer',
  width: '260px',
  margin: '8px',
});

type Props = {
  icon: any;
  title: string | number;
  color: string;
  fontColor: string;
  choice: string;
  borderColor: any;
};

const UserCards: FC<Props> = ({ icon, title, color, fontColor, choice }) => {
  const count = 12;
  return (
    <MyPaper
      elevation={title === choice ? 1 : 0}
      sx={{ backgroundColor: color }}
    >
      <Stack
        sx={{
          color: fontColor,
          mt: 2,
        }}
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        spacing={1}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '17px' }}>
          {title}
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 7,
          }}
        >
          <img src={icon} alt='logo' />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '17px',
              color: '#616161!important',
            }}
          >
            {count}
          </Typography>
        </div>
      </Stack>
    </MyPaper>
  );
};

export { UserCards };
