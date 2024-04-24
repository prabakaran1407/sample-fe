import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@mui/material';

export const InfoIcon = (props: any) => (<Tooltip title={props?.info || ''}>
    <InfoOutlinedIcon sx={{ fontSize: '10px', ...props?.iconStyle }} />
</Tooltip>)