/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import { FC } from 'react';
// import { toAbsoluteUrl } from "../../../helpers";
import { Box, Typography } from '@mui/material';

type Props = {
  icon: string;
  title: string;
  description: string;
  color: string;
  fontColor: string;
  iconColor?: string;
  width: number;
  height: number;
  isIconTrue?: boolean;
};

const ProductSelectCards: FC<Props> = ({
  icon,
  title,
  description,
  color,
  fontColor,
  iconColor,
  isIconTrue = true,
}) => {
  return (
    <Box
      sx={{
        height: '120px',
        // width: width,
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: '600', color: fontColor }}>
          {title}
        </Typography>
        {isIconTrue ? (
          <Box
            style={{
              textAlign: 'center',
              color: iconColor,
            }}
          >
            <img src={icon} alt='logo' width={30} />
          </Box>
        ) : null}
        <Typography
          sx={{ fontSize: 14, color: fontColor, textAlign: 'center' }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export { ProductSelectCards };
